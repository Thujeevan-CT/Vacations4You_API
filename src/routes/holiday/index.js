const { Holiday } = require('../../models');
const express = require('express');
const router = express.Router();
const responseHandler = require('../../utils/response');
const packageValidation = require('../../utils/validation/package');
const moment = require('moment');
const validate = require('../../utils/validation');
const middleware = require("../../middleware");
const { packageResponse } = require('../../utils/resources/package');

router.post('/new', middleware.authRole(['admin', 'staff']), validate(packageValidation.newPackage), async (req, res) => {
  try {
    const { title, description, destination, duration, no_of_travelers, price, specialty } = req.query;

    const newPackage = Holiday({
      title,
      description,
      destination,
      duration,
      no_of_travelers,
      price,
      specialty,
    });

    const data = await newPackage.save();
    return responseHandler.success(res, packageResponse(data), "Package created successfully.");
  } catch (error) {
    console.log(error);
    return responseHandler.serverError(res);
  }
});


module.exports = router;

