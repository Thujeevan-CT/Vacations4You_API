const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const moment = require('moment');

const bookingSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  product_type: {
    type: String,
    required: true,
  },
  product_id: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    ref: 'user',
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
  meal_preference: {
    type: String,
    required: false,
  },
  cabin: {
    type: String,
    required: false,
  },
  participants: [
    {
      name: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
    }
  ],
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  created_at: {
    type: String,
    default: () => moment.utc().format()
  },
  updated_at: {
    type: String,
    default: () => moment.utc().format()
  },
}, { versionKey: false });

bookingSchema.pre('findOneAndUpdate', function() {
  this.set({ updated_at: moment.utc().format() });
});

const Booking = mongoose.model('bookings', bookingSchema);

module.exports = Booking;