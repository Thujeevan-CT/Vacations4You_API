const { body, query, param } = require("express-validator");

exports.id = param("id")
  .notEmpty()
  .withMessage("id is required!");

exports.firstName = query("first_name")
  .notEmpty()
  .withMessage("First name should be provided!")
  .isLength({ min: 3, max: 120 })
  .withMessage("First name must be 3 to 120 characters length.");

exports.lastName = query("last_name")
  .notEmpty()
  .withMessage("Last name should be provided!")
  .isLength({ min: 3, max: 120 })
  .withMessage("Last name 3 to 120 characters length.");

exports.email = query("email")
  .notEmpty()
  .withMessage("Email should be provided!")
  .isEmail()
  .withMessage("Email is not valid")
  .normalizeEmail();

exports.confirmEmail = query("confirm_email")
  .notEmpty()
  .withMessage("Confirm email should be provided!")
  .isEmail()
  .withMessage("Confirm email is not valid")
  .normalizeEmail()
  .custom((value, { req }) => {
    if (value.toLowerCase() !== req.query.email.toLowerCase()) {
      throw new Error("Email and Confirm Email should match!");
    }
    return true;
  });

exports.password = query("password")
  .notEmpty()
  .withMessage("Password should be provided!")
  .isLength({ min: 6, max: 120 })
  .withMessage("Password 6 to 120 characters length.");

exports.confirmPassword = query("confirm_password")
  .notEmpty()
  .withMessage("Confirm Password should be provided!")
  .custom((value, { req }) => {
    if (value !== req.query.password) {
      throw new Error("Confirm Password does not match with password");
    }
    return true;
  });

exports.oldPassword = query("old_password")
  .notEmpty()
  .withMessage("Old password should be provided!")
  .isLength({ min: 6, max: 120 })
  .withMessage("Password 6 to 120 characters length.");

exports.newPassword = query("new_password")
  .notEmpty()
  .withMessage("New password should be provided!")
  .isLength({ min: 6, max: 120 })
  .withMessage("Password 6 to 120 characters length.");

exports.confirmNewPassword = query("confirm_password")
  .notEmpty()
  .withMessage("Confirm Password should be provided!")
  .custom((value, { req }) => {
    if (value !== req.query.new_password) {
      throw new Error("Confirm Password does not match with password");
    }
    return true;
  });

exports.token = query("token")
  .notEmpty()
  .withMessage("Token should be provided!");

exports.role = query("role")
  .custom((value) => {
    if (value !== 'staff' && value !== 'agent') {
      throw new Error("Role is not valid!");
    };

    return true;
  })
  .optional();