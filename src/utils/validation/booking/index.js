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
  totalPrice,
  mealPreference,
  cabin,
  participants
];

exports.getBookings = [
  productTypeOptional,
];
