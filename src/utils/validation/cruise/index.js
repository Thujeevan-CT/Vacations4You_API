const {
  id,
  title,
  titleOptional,
  price,
  description,
  descriptionOptional,
  cruiseDuration,
  cruiseProvider,
  cruiseProviderOptional,
  departureDestination,
  arrivalDestination,
  departureDate,
  arrivalDate,
  departureDestinationOptional,
  arrivalDestinationOptional,
  departureDateOptional,
  arrivalDateOptional,
  cabinClass,
  cabinClassOptional
} = require('../rules');

exports.newCruise = [
  title,
  price,
  cruiseDuration,
  cruiseProvider,
  departureDestination,
  arrivalDestination,
  departureDate,
  arrivalDate,
  cabinClass,
  descriptionOptional
];

exports.updateCruise = [
  id,
  titleOptional,
  cruiseProviderOptional,
  departureDestinationOptional,
  arrivalDestinationOptional,
  departureDateOptional,
  arrivalDateOptional,
  cabinClassOptional,
  descriptionOptional
];

exports.getSingleCruise = [
  id
];