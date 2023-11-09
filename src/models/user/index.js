const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const moment = require('moment');

const otpSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  verify_token: {
    type: String,
    default: "null"
  },
  expire_at: {
    type: String,
    default: "null"
  },
});

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verification_code: {
    type: otpSchema,
    required: false,
  },
  avatar: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  role: {
    type: String,
    enum: ['admin', 'agent', 'staff'],
    default: 'agent',
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, Number(process.env.BCRYPT_SALT));
  this.password = hash;
  return next();
});

userSchema.pre('findOneAndUpdate', function() {
  this.set({ updated_at: moment.utc().format() });
});

const User = mongoose.model('user', userSchema);

module.exports = User;