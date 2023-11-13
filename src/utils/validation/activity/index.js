const {
  id,
  activityType,
  destination,
  price,
  activityTypeOptional,
  destinationOptional,
} = require('../rules');

exports.newActivity = [
  activityType,
  destination,
  price
];

exports.updateActivity = [
  id,
  activityTypeOptional,
  destinationOptional,
];

exports.getSingleActivity = [
  id
];