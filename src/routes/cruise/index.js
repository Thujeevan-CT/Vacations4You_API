const { Cruise } = require('../../models');
const express = require('express');
const router = express.Router();
const responseHandler = require('../../utils/response');
const cruiseValidation = require('../../utils/validation/cruise');
const validate = require('../../utils/validation');
const middleware = require("../../middleware");
const { cruiseResponse, allCruisesResponse } = require('../../utils/resources/cruise');
const FileUpload = require('../../utils/fileUpload');

router.get('/', middleware.authRole(['admin', 'staff', 'agent']), async (req, res) => {
  try {
    let cruises;
    if (req.isAgent) {
      cruises = await Cruise.find({ status: 'active' });
    } else {
      cruises = await Cruise.find();
    }

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
    const { title, cruise_duration, cruise_provider, price } = req.body;

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

