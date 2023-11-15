const {
  productType,
  productId,
  userId,
  totalPrice,
  productTypeOptional
} = require('../rules');

exports.newBooking = [
  productType,
  productId,
  userId,
  totalPrice
];

exports.getBookings = [
  productTypeOptional,
];
