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
  ageRestrictionOptional,
  descriptionOptional
} = require('../rules');

exports.newActivity = [
  activityType,
  destination,
  price,
  date,
  ageRestriction,
  descriptionOptional
];

exports.updateActivity = [
  id,
  activityTypeOptional,
  destinationOptional,
  dateOptional,
  ageRestrictionOptional,
  descriptionOptional
];

exports.getSingleActivity = [
  id
];