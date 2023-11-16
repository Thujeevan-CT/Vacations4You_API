const {
  productType,
  productId,
  userId,
  totalPrice,
  productTypeOptional,
  mealPreference,
  cabin,
  participants
} = require('../rules');

exports.newBooking = [
  productType,
  productId,
  userId,
  mealPreference,
  cabin,
  participants
];

exports.getBookings = [
  productTypeOptional,
];
