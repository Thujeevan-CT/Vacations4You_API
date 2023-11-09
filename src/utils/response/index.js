exports.success = (response, data = {}, message="Success") => {
  return response.status(200).json({
    code: 200,
    status: true,
    message: message,
    data: data,
  });
};

exports.frontError = (response, message) => {
  return response.status(300).json({
    code: 300,
    message: message,
    status: false,
  });
};

exports.error = (response, message="Something went wrong! Try agin.") => {
  return response.status(400).json({
    code: 400,
    message: message,
    status: false,
  });
};

exports.validationError = (response, message) => {
  return response.status(422).json({
    code: 422,
    message: message,
    status: false,
  });
};

exports.notFoundError = (response, message) => {
  return response.status(404).json({
    code: 404,
    message: message,
    status: false,
  });
};


exports.unauthorized = (response, message="Token not provided!") => {
  return response.status(401).json({
    code: 401,
    message: message,
    status: false,
  });
};

exports.forbidden = (response) => {
  return response.status(403).json({
    code: 403,
    message: "You do not have access permission!",
    status: false,
  });
};

exports.tokenExpired = (response) => {
  return response.status(406).json({
    code: 406,
    message: "Token expired!",
    status: false,
  });
};

// Internal server error, Database error, Error in server hardware or infrastructure
exports.serverError = (response) => {
  return response.status(500).json({
    code: 500,
    message: "Oops! Something went wrong on our end. Please try again later.",
    status: false,
  });
};