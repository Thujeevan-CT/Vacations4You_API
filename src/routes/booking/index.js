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
    const { product_type, product_id, user_id, total_price, meal_preference, cabin, participants } = req.body;
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
      total_price,
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

router.post('/', middleware.authRole(['admin', 'staff']), validate(bookingValidation.getBookings), async (req, res) => {
  try {
    const { product_type } = req.query;
    const whereQuery = {};

    if (product_type) {
      whereQuery.product_type = product_type;
    }

    const bookings = await Booking.find(whereQuery);

    if (!bookings) {
      return responseHandler.error(res, 'Booking not found!');
    }

    return responseHandler.success(res, allBookingsResponse(bookings), "Bookings retrieved successfully.");
  } catch (error) {
    console.log(error);
    return responseHandler.serverError(res);
  }
});

module.exports = router;
