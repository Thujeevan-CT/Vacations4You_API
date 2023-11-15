const { Cruise } = require('../../models');
const express = require('express');
const router = express.Router();
const responseHandler = require('../../utils/response');
const cruiseValidation = require('../../utils/validation/cruise');
const validate = require('../../utils/validation');
const middleware = require("../../middleware");
const { cruiseResponse, allCruisesResponse } = require('../../utils/resources/cruise');
const FileUpload = require('../../utils/fileUpload');

router.get('/meals-cabins', middleware.authRole(['admin', 'staff']), async (req, res) => {
  try {
    const mealPreferences = [
      { id: 1, key: 'veg', name: 'Veg' },
      { id: 2, key: 'non-veg', name: 'Non veg' },
    ];
    const Cabins = [
      { id: 1, key: '1', name: '1st cabin' },
      { id: 2, key: '2', name: '2nd cabin' },
      { id: 3, key: '3', name: '3rd cabin' },
      { id: 4, key: '4', name: '4th cabin' },
      { id: 5, key: '5', name: '5th cabin' },
    ];

    return responseHandler.success(res, { meals: mealPreferences, cabins: Cabins }, "Cruises retrieved successfully.");
  } catch (error) {
    console.log(error);
    return responseHandler.serverError(res);
  }
});

router.get('/', middleware.authRole(['admin', 'staff', 'agent']), async (req, res) => {
  try {
    const { cruise_duration, cruise_provider, departure_destination, arrival_destination, departure_date, arrival_date, cabin_class, min_price, max_price } = req.query;
    const whereCondition = {};
    
    if (req.isAgent) {
      whereCondition.status = 'active';
    }
    if (cruise_duration) {
      whereCondition.cruise_duration = cruise_duration;
    }
    if (cruise_provider) {
      whereCondition.cruise_provider = cruise_provider;
    }
    if (departure_destination) {
      whereCondition.departure_destination = departure_destination;
    }
    if (arrival_destination) {
      whereCondition.arrival_destination = arrival_destination;
    }
    if (departure_date) {
      whereCondition.departure_date = departure_date;
    }
    if (arrival_date) {
      whereCondition.arrival_date = arrival_date;
    }
    if (cabin_class) {
      whereCondition.cabin_class = cabin_class;
    }
    if (min_price) {
      whereCondition.price = { $gte: parseInt(min_price) };
    }
    if (max_price) {
      whereCondition.price = { ...whereCondition.price, $lte: parseInt(max_price) };
    }

    const cruises = await Cruise.find(whereCondition);
    if (!cruises) {
      return responseHandler.error(res, 'Cruises not found!');
    };

    return responseHandler.success(res, allCruisesResponse(cruises), "Cruises retrieved successfully.");
  } catch (error) {
    console.log(error);
    return responseHandler.serverError(res);
  }
});

router.get('/:id', middleware.authRole(['admin', 'staff', 'agent']), validate(cruiseValidation.getSingleCruise), async (req, res) => {
  try {
    let cruise;
    const { id } = req.params;
    if (req.isAgent) {
      cruise = await Cruise.findOne({ status: 'active', _id: id });
    } else {
      cruise = await Cruise.findOne({ _id: id });
    }

    if (!cruise) {
      return responseHandler.error(res, 'Cruise not found!');
    };

    return responseHandler.success(res, cruiseResponse(cruise), "Cruise retrieved successfully.");
  } catch (error) {
    console.log(error);
    return responseHandler.serverError(res);
  }
});

router.post('/new', middleware.authRole(['admin', 'staff']), validate(cruiseValidation.newCruise), async (req, res) => {
  try {
    const { title, description, departure_destination, arrival_destination, departure_date, arrival_date, cabin_class, cruise_duration, cruise_provider, price } = req.body;

    const alreadyHaveTitle = await Cruise.findOne({ title: title });
    if(alreadyHaveTitle) {
      return responseHandler.validationError(res, 'Cruise type already have!');
    }

    const uploadAvatar = new FileUpload(req, "assets/images/cruises", "image", false);
    const fileNotValid = uploadAvatar.validate();
    if (fileNotValid) {
      return responseHandler.frontError(res, fileNotValid);
    }
    const uploadedAvatar = await uploadAvatar.upload();

    const newCruise = Cruise({
      title,
      description,
      departure_destination,
      arrival_destination,
      departure_date,
      arrival_date,
      cabin_class,
      cruise_duration,
      cruise_provider,
      price,
      ...uploadedAvatar
    });

    const data = await newCruise.save();
    return responseHandler.success(res, cruiseResponse(data), "Cruise created successfully.");
  } catch (error) {
    console.log(error);
    return responseHandler.serverError(res);
  }
});

router.put('/update/:id', middleware.authRole(['admin', 'staff']), validate(cruiseValidation.updateCruise), async (req, res) => {
  try {
    const { id } = req.params;
    const cruise = await Cruise.findById(id);
    if (!cruise) {
      return responseHandler.error(res, 'Cruise not found!');
    };
    
    const updatedData = await Cruise.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { returnOriginal: false }
    )
    return responseHandler.success(res, cruiseResponse(updatedData), "Cruise updated successfully.");
  } catch (error) {
    console.log(error);
    return responseHandler.serverError(res);
  }
});

router.delete('/delete/:id', middleware.authRole(['admin', 'staff']), validate(cruiseValidation.getSingleCruise), async (req, res) => {
  try {
    const { id } = req.params;
    const cruise = await Cruise.findById(id);
    if (!cruise) {
      return responseHandler.error(res, 'Cruise not found!');
    };
    
    await Cruise.findByIdAndDelete(id);
    return responseHandler.success(res, {}, "Cruise deleted successfully.");
  } catch (error) {
    console.log(error);
    return responseHandler.serverError(res);
  }
});

module.exports = router;

