const { Booking, Holiday, Cruise, Activity, User } = require('../../models');
const express = require('express');
const router = express.Router();
const responseHandler = require('../../utils/response');
const bookingValidation = require('../../utils/validation/booking');
const validate = require('../../utils/validation');
const middleware = require("../../middleware");
const { bookingResponse, allBookingsResponse } = require('../../utils/resources/booking');

router.post('/', middleware.authRole(['agent']), validate(bookingValidation.newBooking), async (req, res) => {
  try {
    const { product_type, product_id, user_id, meal_preference, cabin, participants } = req.body;
    let product;
    if (product_type === 'holiday') {
      product = await Holiday.findOne({ _id: product_id })
    } else if (product_type === 'cruise') {
      product = await Cruise.findOne({ _id: product_id })
    } else {
      product = await Activity.findOne({ _id: product_id })
    }

    if (!product) {
      return responseHandler.error(res, 'Product not found!');
    }

    const user = await User.findById(user_id);
    if (!user) {
      return responseHandler.error(res, 'User not valid!');
    }

    const newBooking = Booking({
      product_type,
      product_id,
      user: user_id,
      total_price: product.price,
      meal_preference: meal_preference ? meal_preference : null,
      cabin: cabin ? cabin : null,
      participants: participants ? participants : null,
    });
    const data = await newBooking.save();

    return responseHandler.success(res, bookingResponse(data), "Product booked successfully.");
  } catch (error) {
    console.log(error);
    return responseHandler.serverError(res);
  }
});

router.get('/', middleware.authRole(['admin', 'staff', 'agent']), validate(bookingValidation.getBookings), async (req, res) => {
  try {
    const whereQuery = {};
    const { product_type, user_id } = req.query;

    if (req.isAgent && user_id !== req.userId) {
      return responseHandler.forbidden(res);
    }
    
    const page = parseInt(req.query.page) || 1; 
    const pageSize = parseInt(req.query.page_size) || 100;
    const skip = (page - 1) * pageSize;
    
    if (product_type) { 
      whereQuery.product_type = product_type;
    }
    if (req.isAgent && user_id) { 
      whereQuery.user = user_id;
    }

    const bookings = await Booking.find(whereQuery).populate(['user']).skip(skip).limit(pageSize);
    if (!bookings) {
      return responseHandler.error(res, 'Bookings not found!');
    };

    const responseData = [];
    const productCache = {};

    for (const data of bookings) {
      if (data.product_type === 'cruise' || data.product_type === 'holiday' || data.product_type === 'activity') {
        const productId = data.product_id;

        if (!productCache[productId]) {
          let product;
          if (data.product_type === 'cruise') {
            product = await Cruise.findById(productId);
          } else if (data.product_type === 'holiday') {
            product = await Holiday.findById(productId);
          } else if (data.product_type === 'activity') {
            console.log("Run")
            product = await Activity.findById(productId);
          }

          if (product) {
            responseData.push({ ...data._doc, product });
            productCache[productId] = responseData[responseData.length - 1].product;
          }
        } else {
          responseData.push({ ...data._doc, product: productCache[productId] });
        }
      }
    }

    return responseHandler.success(res, allBookingsResponse(responseData), "Bookings retrieved successfully.");
  } catch (error) {
    console.log(error);
    return responseHandler.serverError(res);
  }
});

module.exports = router;