const { Activity } = require('../../models');
const express = require('express');
const router = express.Router();
const responseHandler = require('../../utils/response');
const activityValidation = require('../../utils/validation/activity');
const validate = require('../../utils/validation');
const middleware = require("../../middleware");
const { activityResponse, allActivitiesResponse } = require('../../utils/resources/activity');
const FileUpload = require('../../utils/fileUpload');
const { getRandomNumber } = require('../../utils/helpers');

router.get('/', middleware.authRole(['admin', 'staff', 'agent']), async (req, res) => {
  try {
    const { price, rating } = req.query;
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
    
    const activities = await Activity.find(whereCondition);
    if (!activities) {
      return responseHandler.error(res, 'Activities not found!');
    };

    return responseHandler.success(res, allActivitiesResponse(activities), "Activities retrieved successfully.");
  } catch (error) {
    console.log(error);
    return responseHandler.serverError(res);
  }
});

router.get('/:id', middleware.authRole(['admin', 'staff', 'agent']), validate(activityValidation.getSingleActivity), async (req, res) => {
  try {
    let activity;
    const { id } = req.params;
    if (req.isAgent) {
      activity = await Activity.findOne({ status: 'active', _id: id });
    } else {
      activity = await Activity.findOne({ _id: id });
    }

    if (!activity) {
      return responseHandler.error(res, 'Activity not found!');
    };

    return responseHandler.success(res, activityResponse(activity), "Activity retrieved successfully.");
  } catch (error) {
    console.log(error);
    return responseHandler.serverError(res);
  }
});

router.post('/new', middleware.authRole(['admin', 'staff']), validate(activityValidation.newActivity), async (req, res) => {
  try {
    const { activity_type, destination, price, date, age_restriction } = req.body;

    const alreadyHaveTitle = await Activity.findOne({ activity_type: activity_type });
    if(alreadyHaveTitle) {
      return responseHandler.validationError(res, 'Activity type already have!');
    }

    const uploadAvatar = new FileUpload(req, "assets/images/activities", "image", false);
    const fileNotValid = uploadAvatar.validate();
    if (fileNotValid) {
      return responseHandler.frontError(res, fileNotValid);
    }
    const uploadedAvatar = await uploadAvatar.upload();

    const newActivity = Activity({
      activity_type,
      destination,
      date,
      price,
      age_restriction,
      rating: getRandomNumber(),
      ...uploadedAvatar
    });

    const data = await newActivity.save();
    return responseHandler.success(res, activityResponse(data), "Activity created successfully.");
  } catch (error) {
    console.log(error);
    return responseHandler.serverError(res);
  }
});

router.put('/update/:id', middleware.authRole(['admin', 'staff']), validate(activityValidation.updateActivity), async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id);
    if (!activity) {
      return responseHandler.error(res, 'Activity not found!');
    };
    
    const updatedData = await Activity.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { returnOriginal: false }
    )
    return responseHandler.success(res, activityResponse(updatedData), "Activity updated successfully.");
  } catch (error) {
    console.log(error);
    return responseHandler.serverError(res);
  }
});

router.delete('/delete/:id', middleware.authRole(['admin', 'staff']), validate(activityValidation.getSingleActivity), async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id);
    if (!activity) {
      return responseHandler.error(res, 'Activity not found!');
    };
    
    await Activity.findByIdAndDelete(id);
    return responseHandler.success(res, {}, "Activity deleted successfully.");
  } catch (error) {
    console.log(error);
    return responseHandler.serverError(res);
  }
});

module.exports = router;

