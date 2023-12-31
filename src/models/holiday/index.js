const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const moment = require('moment');

const holidayPackageSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  destination: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  no_of_travelers: {
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
  specialty: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
    default: 4,
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

holidayPackageSchema.pre('findOneAndUpdate', function() {
  this.set({ updated_at: moment.utc().format() });
});

const HolidayPackage = mongoose.model('holiday-package', holidayPackageSchema);

module.exports = HolidayPackage;