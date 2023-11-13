const jwt = require('jsonwebtoken');
const { User } = require("../models");
const responseHandler = require("../utils/response");

module.exports = (roles = [], publicApi= false) => {
  return (req, res, next) => {
    const token =
      req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

    if (token === null || token === undefined) {
      if (!publicApi) {
        return responseHandler.forbidden(res);
      }
    }

    req.isAdmin = false;
    req.isAgent = false;
    req.isStaff = false;

    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return responseHandler.tokenExpired(res);
        } else {
          if (publicApi) {
            next();
          } else {
            return responseHandler.unauthorized(res, "Invalid Token!");
          }
        }
      } else {
        if (publicApi) {
          const user = await User.findById(payload.user.id);

          if (!user) {
            next();
          }

          req.isAdmin = payload.user.role === 'admin';
          req.isAgent = payload.user.role === 'agent';
          req.isStaff = payload.user.role === 'staff';
          
          next();
        } else {

          try {
            const userRole = payload.user.role;

            if (!roles.some((role) => userRole.includes(role))) {
              return responseHandler.forbidden(res);
            }

            const user = await User.findById(payload.user.id);
            if (!user) {
              return responseHandler.unauthorized(res);
            }

            req.data = user;
            req.isAdmin = userRole === 'admin';
            req.isAgent = userRole === 'agent';
            req.isStaff = userRole === 'staff';
            req.userId = user._id;
            next();
          } catch (error) {
            console.log("AuthRole", error);
            return responseHandler.serverError(res);
          }
        }
      }
    });
  };
};