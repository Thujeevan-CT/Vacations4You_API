const { body, param } = require("express-validator");

exports.id = param("id")
  .notEmpty()
  .withMessage("id is required!");

exports.firstName = body("first_name")
  .notEmpty()
  .withMessage("First name should be provided!")
  .isLength({ min: 3, max: 120 })
  .withMessage("First name must be 3 to 120 characters length.");

exports.lastName = body("last_name")
  .notEmpty()
  .withMessage("Last name should be provided!")
  .isLength({ min: 3, max: 120 })
  .withMessage("Last name 3 to 120 characters length.");

exports.email = body("email")
  .notEmpty()
  .withMessage("Email should be provided!")
  .isEmail()
  .withMessage("Email is not valid")
  .normalizeEmail();

exports.confirmEmail = body("confirm_email")
  .notEmpty()
  .withMessage("Confirm email should be provided!")
  .isEmail()
  .withMessage("Confirm email is not valid")
  .normalizeEmail()
  .custom((value, { req }) => {
    if (value.toLowerCase() !== req.body.email.toLowerCase()) {
      throw new Error("Email and Confirm Email should match!");
    }
    return true;
  });

exports.password = body("password")
  .notEmpty()
  .withMessage("Password should be provided!")
  .isLength({ min: 6, max: 120 })
  .withMessage("Password 6 to 120 characters length.");

exports.confirmPassword = body("confirm_password")
  .notEmpty()
  .withMessage("Confirm Password should be provided!")
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Confirm Password does not match with password");
    }
    return true;
  });

exports.oldPassword = body("old_password")
  .notEmpty()
  .withMessage("Old password should be provided!")
  .isLength({ min: 6, max: 120 })
  .withMessage("Password 6 to 120 characters length.");

exports.newPassword = body("new_password")
  .notEmpty()
  .withMessage("New password should be provided!")
  .isLength({ min: 6, max: 120 })
  .withMessage("Password 6 to 120 characters length.");

exports.confirmNewPassword = body("confirm_password")
  .notEmpty()
  .withMessage("Confirm Password should be provided!")
  .custom((value, { req }) => {
    if (value !== req.body.new_password) {
      throw new Error("Confirm Password does not match with password");
    }
    return true;
  });

exports.token = body("token")
  .notEmpty()
  .withMessage("Token should be provided!");

exports.role = body("role")
  .custom((value) => {
    if (value !== 'staff' && value !== 'agent') {
      throw new Error("Role is not valid!");
    };

    return true;
  })
  .optional();

exports.title = body("title")
  .notEmpty()
  .withMessage("Title should be provided!")
  .isLength({ min: 3, max: 255 })
  .withMessage("Title 3 to 255 characters length.");

exports.description = body("description")
  .notEmpty()
  .withMessage("Description should be provided!")
  .isLength({ min: 3, })
  .withMessage("Description minimum 3 characters length.");

exports.destination = body("destination")
  .notEmpty()
  .withMessage("Destination should be provided!")
  .isLength({ min: 3, max: 255 })
  .withMessage("Destination 3 to 255 characters length.");

exports.duration = body("duration")
  .notEmpty()
  .withMessage("Duration should be provided!");

exports.noOfTravelers = body("no_of_travelers")
  .notEmpty()
  .withMessage("No of travelers should be provided!");

exports.price = body("price")
  .notEmpty()
  .withMessage("Price should be provided!");

exports.specialty = body("price")
  .notEmpty()
  .withMessage("Specialty should be provided!");

exports.titleOptional = body("title")
  .isLength({ min: 3, max: 255 })
  .withMessage("Title 3 to 255 characters length.")
  .optional()

exports.descriptionOptional = body("description")
  .isLength({ min: 3, })
  .withMessage("Description minimum 3 characters length.")
  .optional()

exports.destinationOptional = body("destination")
  .isLength({ min: 3, max: 255 })
  .withMessage("Destination 3 to 255 characters length.")
  .optional()