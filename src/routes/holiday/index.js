const { Holiday } = require('../../models');
const express = require('express');
const router = express.Router();
const responseHandler = require('../../utils/response');
const packageValidation = require('../../utils/validation/package');
const validate = require('../../utils/validation');
const middleware = require("../../middleware");
const { packageResponse, allPackagesResponse } = require('../../utils/resources/package');
const FileUpload = require('../../utils/fileUpload');
const { getRandomNumber } = require('../../utils/helpers');

router.get('/', middleware.authRole(['admin', 'staff', 'agent']), async (req, res) => {
  try {
    const { price, rating, duration } = req.query;
    const whereCondition = {};

    if (req.isAgent) {
      whereCondition.status = 'active';
    }
    if (price) {
      whereCondition.price = price;
    }
    if (rating) {
      whereCondition.rating = rating;
    }
    if (duration) {
      whereCondition.duration = duration;
    }
    
    const packages = await Holiday.find(whereCondition);

    if (!packages) {
      return responseHandler.error(res, 'Packages not found!');
    };

    return responseHandler.success(res, allPackagesResponse(packages), "Packages retrieved successfully.");
  } catch (error) {
    console.log(error);
    return responseHandler.serverError(res);
  }
});

router.get('/:id', middleware.authRole(['admin', 'staff', 'agent']), validate(packageValidation.getSinglePackage), async (req, res) => {
  try {
    let package;
    const { id } = req.params;
    if (req.isAgent) {
      package = await Holiday.findOne({ status: 'active', _id: id });
    } else {
      package = await Holiday.findOne({ _id: id });
    }

    if (!package) {
      return responseHandler.error(res, 'Package not found!');
    };

    return responseHandler.success(res, packageResponse(package), "Package retrieved successfully.");
  } catch (error) {
    console.log(error);
    return responseHandler.serverError(res);
  }
});

router.post('/new', middleware.authRole(['admin', 'staff']), validate(packageValidation.newPackage), async (req, res) => {
  try {
    const { title, description, destination, duration, no_of_travelers, price, specialty } = req.body;

    const alreadyHaveTitle = await Holiday.findOne({ title: title });
    if(alreadyHaveTitle) {
      return responseHandler.validationError(res, 'Title already have!');
    }

    const uploadAvatar = new FileUpload(req, "assets/images/holiday-packages", "image", false);
    const fileNotValid = uploadAvatar.validate();
    if (fileNotValid) {
      return responseHandler.frontError(res, fileNotValid);
    }
    const uploadedAvatar = await uploadAvatar.upload();

    const newPackage = Holiday({
      title,
      description,
      destination,
      duration,
      no_of_travelers,
      price,
      specialty,
      rating: getRandomNumber(),
      ...uploadedAvatar
    });

    const data = await newPackage.save();
    return responseHandler.success(res, packageResponse(data), "Package created successfully.");
  } catch (error) {
    console.log(error);
    return responseHandler.serverError(res);
  }
});

router.put('/update/:id', middleware.authRole(['admin', 'staff']), validate(packageValidation.updatePackage), async (req, res) => {
  try {
    const { id } = req.params;
    const package = await Holiday.findById(id);
    if (!package) {
      return responseHandler.error(res, 'Package not found!');
    };
    
    const updatedData = await Holiday.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { returnOriginal: false }
    )
    return responseHandler.success(res, packageResponse(updatedData), "Package updated successfully.");
  } catch (error) {
    console.log(error);
    return responseHandler.serverError(res);
  }
});

router.delete('/delete/:id', middleware.authRole(['admin', 'staff']), validate(packageValidation.getSinglePackage), async (req, res) => {
  try {
    const { id } = req.params;
    const package = await Holiday.findById(id);
    if (!package) {
      return responseHandler.error(res, 'Package not found!');
    };
    
    await Holiday.findByIdAndDelete(id);

    return responseHandler.success(res, {}, "Package deleted successfully.");
  } catch (error) {
    console.log(error);
    return responseHandler.serverError(res);
  }
});

module.exports = router;

