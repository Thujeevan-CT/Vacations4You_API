const {
  id,
  title,
  description,
  destination,
  duration,
  noOfTravelers,
  price,
  specialty,
  titleOptional,
  descriptionOptional,
  destinationOptional
} = require('../rules');

exports.newPackage = [
  title,
  descriptionOptional,
  destination,
  duration,
  noOfTravelers,
  price,
  specialty
];

exports.updatePackage = [
  id,
  titleOptional,
  descriptionOptional,
  destinationOptional
];

exports.getSinglePackage = [
  id
];