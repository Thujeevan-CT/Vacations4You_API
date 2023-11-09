const { validationResult } = require('express-validator');
const responseHandler = require('../response');

module.exports = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const resErr = [];

    errors.array().map((e) => resErr.push(e.msg));
    return responseHandler.validationError(res, resErr);
  };
};