const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const moment = require('moment');

const activityReservationsSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  activity_type: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
    default: 4,
  },
  age_restriction: {
    type: Number,
    required: false,
  },
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

activityReservationsSchema.pre('findOneAndUpdate', function() {
  this.set({ updated_at: moment.utc().format() });
});

const ActivityReservations = mongoose.model('activity-reservations', activityReservationsSchema);

module.exports = ActivityReservations;