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
  role,
  passwordOptional
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
  passwordOptional
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