const {
  id,
  title,
  titleOptional,
  price,
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
  cabinClass
];

exports.updateCruise = [
  id,
  titleOptional,
  cruiseProviderOptional,
  departureDestinationOptional,
  arrivalDestinationOptional,
  departureDateOptional,
  arrivalDateOptional,
  cabinClassOptional
];

exports.getSingleCruise = [
  id
];