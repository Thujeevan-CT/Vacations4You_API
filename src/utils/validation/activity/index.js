const {
  id,
  activityType,
  destination,
  price,
  activityTypeOptional,
  destinationOptional,
  date,
  dateOptional,
  ageRestriction,
  ageRestrictionOptional
} = require('../rules');

exports.newActivity = [
  activityType,
  destination,
  price,
  date,
  ageRestriction
];

exports.updateActivity = [
  id,
  activityTypeOptional,
  destinationOptional,
  dateOptional,
  ageRestrictionOptional
];

exports.getSingleActivity = [
  id
];