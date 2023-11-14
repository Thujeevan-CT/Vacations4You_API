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

exports.passwordOptional = body("password")
  .notEmpty()
  .withMessage("Password should be provided!");

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
  .withMessage("Duration should be provided!")

exports.noOfTravelers = body("no_of_travelers")
  .notEmpty()
  .withMessage("No of travelers should be provided!")
  .isInt()
  .withMessage('Price must be a number!')

exports.price = body("price")
  .notEmpty()
  .withMessage("Price should be provided!")
  .isInt()
  .withMessage('Price must be a number!')

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
  .optional();

exports.activityType = body("activity_type")
  .notEmpty()
  .withMessage("Activity type should be provided!")
  .isLength({ min: 3, max: 255 })
  .withMessage("Activity type 3 to 255 characters length.");

exports.activityTypeOptional = body("activity_type")
  .isLength({ min: 3, max: 255 })
  .withMessage("Activity type 3 to 255 characters length.")
  .optional();

exports.cruiseDuration = body("cruise_duration")
  .notEmpty()
  .withMessage("Cruise duration should be provided!")

exports.cruiseProvider = body("cruise_provider")
  .notEmpty()
  .withMessage("Cruise provider should be provided!")
  .isLength({ min: 3, max: 255 })
  .withMessage("Cruise provider 3 to 255 characters length.");

exports.cruiseProviderOptional = body("cruise_provider")
  .isLength({ min: 3, max: 255 })
  .withMessage("Cruise provider 3 to 255 characters length.")
  .optional();

exports.departureDestination = body("departure_destination")
  .notEmpty()
  .withMessage("Departure destination should be provided!")
  .isLength({ min: 3, max: 255 })
  .withMessage("Departure destination 3 to 255 characters length.");

exports.arrivalDestination = body("arrival_destination")
  .notEmpty()
  .withMessage("Arrival destination should be provided!")
  .isLength({ min: 3, max: 255 })
  .withMessage("Arrival destination 3 to 255 characters length.");
  
exports.departureDate = body("departure_date")
  .notEmpty()
  .withMessage("Departure date should be provided!");

exports.arrivalDate = body("arrival_date")
  .notEmpty()
  .withMessage("Arrival date should be provided!");

exports.departureDestinationOptional = body("departure_destination")
  .isLength({ min: 3, max: 255 })
  .withMessage("Departure destination 3 to 255 characters length.")
  .optional();

exports.arrivalDestinationOptional = body("arrival_destination")
  .isLength({ min: 3, max: 255 })
  .withMessage("Arrival destination 3 to 255 characters length.")
  .optional();
  
exports.departureDateOptional = body("departure_date")
  .optional();

exports.arrivalDateOptional = body("arrival_date")
  .optional();

exports.cabinClass = body("cabin_class")
  .notEmpty()
  .withMessage("Arrival date should be provided!")
  .isInt()
  .withMessage('Cabin class must be a number!');

exports.cabinClassOptional = body("cabin_class")
  .isInt()
  .withMessage('Cabin class must be a number!')
  .optional();

exports.date = body("date")
  .notEmpty()
  .withMessage("Date should be provided!");

exports.dateOptional = body("date")
  .optional();

exports.ageRestriction = body("age_restriction")
  .notEmpty()
  .withMessage("Age restriction should be provided!")
  .isInt()
  .withMessage('Age is a number!');

exports.ageRestrictionOptional = body("age_restriction")
  .isInt()
  .withMessage('Age is a number!')
  .optional();