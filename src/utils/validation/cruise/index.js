const {
  id,
  title,
  titleOptional,
  price,
  cruiseDuration,
  cruiseProvider,
  cruiseProviderOptional
} = require('../rules');

exports.newCruise = [
  title,
  price,
  cruiseDuration,
  cruiseProvider,
];

exports.updateCruise = [
  id,
  titleOptional,
  cruiseProviderOptional
];

exports.getSingleCruise = [
  id
];