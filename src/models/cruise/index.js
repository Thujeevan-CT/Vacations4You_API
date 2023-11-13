const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const moment = require('moment');

const cruiseReservationsSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  title: {
    type: String,
    required: true,
  },
  cruise_duration: {
    type: String,
    required: true,
  },
  cruise_provider: {
    type: String,
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

cruiseReservationsSchema.pre('findOneAndUpdate', function() {
  this.set({ updated_at: moment.utc().format() });
});

const CruiseReservations = mongoose.model('cruise-reservation', cruiseReservationsSchema);

module.exports = CruiseReservations;