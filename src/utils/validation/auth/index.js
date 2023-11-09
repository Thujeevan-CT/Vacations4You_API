const {
  id,
  firstName,
  lastName,
  email,
  confirmEmail,
  password,
  confirmPassword,
  newPassword,
  oldPassword,
  confirmNewPassword,
  token,
  role
} = require('../rules');

exports.register = [
  firstName,
  lastName,
  email,
  confirmEmail,
  password,
  confirmPassword,
  role
];

exports.login = [
  email,
  password
];

exports.changePassword = [
  id,
  newPassword,
  oldPassword,
  confirmNewPassword,
];

exports.forgotPassword = [
  email
];

exports.resetPassword = [
  token,
  newPassword,
  confirmNewPassword,
];