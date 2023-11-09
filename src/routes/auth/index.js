const { User } = require('../../models');
const express = require('express');
const router = express.Router();
const responseHandler = require('../../utils/response');
const authValidation = require('../../utils/validation/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { userResponse } = require('../../utils/resources/user');
const validate = require('../../utils/validation');
const middleware = require("../../middleware");
const { transporter } = require("../../utils/email")

router.get('/refresh-token', async (req, res) => {
  try {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    if (!token) {
      return responseHandler.unauthorized(res);
    }

    jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true }, async (err, payload) => {
      if (err) {
        return responseHandler.unauthorized(res, "Invalid Token!");
      } else {
        try {
          const newToken = jwt.sign(
            { user: userResponse(payload.user).user },
            process.env.JWT_SECRET,
            {
              algorithm: "HS256",
              expiresIn: process.env.JWT_TOKEN_EXPIRE,
            }
          );

          let expire_at;
          jwt.verify(newToken, process.env.JWT_SECRET, async (err, payload) => {
            expire_at = moment.unix(payload.exp).format('MMMM Do YYYY, h:mm:ss a');;
          });

          const tokenData = {
            token: newToken,
            expire_at: expire_at
          };

          return responseHandler.success(res, tokenData, "Refresh token generated successfully");
        } catch (error) {
          console.log(error)
          return responseHandler.serverError(res);
        }
      };
    });

  } catch (error) {
    console.log(error);
    return responseHandler.serverError(res);
  }
});

router.post('/register', validate(authValidation.register), async (req, res) => {
  try {
    const { first_name, last_name, email, password, role } = req.query;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      return responseHandler.validationError(res, "The selected email is already taken!.");
    }

    const newUser = User({
      first_name: first_name,
      last_name: last_name,
      email: email.toLowerCase(),
      password,
      role: role === 'staff' ? 'staff' : 'agent'
    });
    const data = await newUser.save();

    return responseHandler.success(res, userResponse(data), "User registered successfully.");
  } catch (error) {
    console.log(error)
    return responseHandler.serverError(res);
  }
});

router.post('/login', validate(authValidation.login), async (req, res) => {
  try {
    const { email, password } = req.query;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return responseHandler.notFoundError(res, "Your password or email is incorrect!");
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (user && isPasswordCorrect) {
      const token = jwt.sign(
        { user: userResponse(user).user },
        process.env.JWT_SECRET,
        {
          algorithm: "HS256",
          expiresIn: process.env.JWT_TOKEN_EXPIRE,
        }
      );

      let expire_at;
      jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        expire_at = moment.unix(payload.exp).format('MMMM Do YYYY, h:mm:ss a');;
      });

      const tokenData = {
        token: token,
        expire_at: expire_at
      };
      return responseHandler.success(res, userResponse(user, tokenData), "User login successfully");
    } else {
      return responseHandler.notFoundError(res, "Your password or email is incorrect!");
    }
  } catch (error) {
    console.log(error)
    return responseHandler.serverError(res);
  }
});

router.post('/forgot-password', validate(authValidation.forgotPassword), async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return responseHandler.notFoundError(res, "Email is invalid!");
    };

    const resetToken = jwt.sign(
      { user: userResponse(user).user },
      process.env.RESET_PASSWORD_SECRET, { expiresIn: '15m' }
    );

    let expire_at;
    jwt.verify(resetToken, process.env.RESET_PASSWORD_SECRET, async (err, payload) => {
      expire_at = moment.unix(payload.exp).format('MMMM Do YYYY, h:mm:ss a');;
    });

    const forgotTokenLink = {
      verify_token: resetToken,
      expire_at: expire_at
    };

    await User.findByIdAndUpdate(
      user._id,
      { verification_code: forgotTokenLink },
      { returnOriginal: false }
    );
    const htmlMail = `
      <div style="width: 100%; text-align: center; margin-top: 12px">
        <p style="font-size: 1.4em;"><b>Reset password</b></p>
        <p style="font-size: 1.4em;">Please follow the link to reset your password</b></p>
        <a href="${process.env.APP_URL}/reset-password/${resetToken}" style="border-collapse: collapse; border-radius: 6px; text-align: center; display: block; 
        background: linear-gradient(to right, #00C9FF 0%, #4C58FE 100%); width: 100%, maxWidth: 560px;
        padding: 8px 20px 8px 20px;">
          Reset password
        </a>
        <p style="font-size: 1.4em;>This Link is valid for the next <b>15 minutes</b> only.</p> <br /> <br />

        <p style="font-size: 1.4em;>
          Thanks <br />
          <b>
          Vacations4You.lk
          </b>
        </p>
      </div>
    `;

    transporter.sendMail({
      to: user.email.toLowerCase(),
      subject: `Vacations4You account recovery`,
      html: htmlMail
    });
    return responseHandler.success(res, {}, "Password reset link sended to your mail.");
  } catch (error) {
    console.log(error);
    return responseHandler.serverError(res);
  }
});

router.put('/change-password/:id', middleware.authRole(['admin', 'staff', 'agent']), validate(authValidation.changePassword), async (req, res) => {
  try {
    const user_id_jwt = req.userId;
    const user_id = req.params.id;
    const { old_password, new_password } = req.query;

    if (old_password === new_password) {
      return responseHandler.validationError(res, "Old password and new password are same!");
    }

    if ((user_id !== req.userId) || (user_id !== user_id_jwt)) {
      return responseHandler.notFoundError(res, "User not found! check given data and try again.");
    }

    const user = await User.findById(user_id_jwt);
    if (!user) {
      return responseHandler.notFoundError(res, "User is invalid!");
    };

    const isPasswordCorrect = bcrypt.compareSync(old_password, user.password);
    if (!isPasswordCorrect) {
      return responseHandler.validationError(res, "Your current password not match!");
    } else {
      const hashedPassword = await bcrypt.hash(new_password, Number(process.env.BCRYPT_SALT));

      const newData = await User.findByIdAndUpdate(
        user._id,
        { password: hashedPassword },
        { returnOriginal: false }
      );

      if (!newData) {
        return responseHandler.error(res);
      }

      if (newData) {
        return responseHandler.success(
          res,
          userResponse(newData),
          "Password changed successfully."
        );
      }
    }

    return responseHandler.error(res);

  } catch (error) {
    console.log(error);
    return responseHandler.serverError(res);
  }
});

router.put('/reset-password', validate(authValidation.resetPassword), async (req, res) => {
  try {
    const { token, new_password } = req.query;

    jwt.verify(token, process.env.RESET_PASSWORD_SECRET, async (err, payload) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return responseHandler.validationError(res, "Password reset link has expired. Please request a new one.");
        } else {
          return responseHandler.unauthorized(res, "Invalid Token!");
        }
      } else {
        try {
          const user_id = payload.user.id;
          const user = await User.findById(user_id);

          if (!user) {
            return responseHandler.notFoundError(res, "User is invalid!");
          }

          if (user.verification_code.verify_token === "null") {
            return responseHandler.validationError(res, "Token expired! Please request a new one.");
          }

          const isPasswordCorrect = bcrypt.compareSync(new_password, user.password);
          if (isPasswordCorrect) {
            return responseHandler.validationError(res, "Current password and new password are same!");
          }

          const hashedPassword = await bcrypt.hash(new_password, Number(process.env.BCRYPT_SALT));

          const forgotTokenLink = {
            verify_token: "null",
            expire_at: "null",
          };

          let newData = await User.findByIdAndUpdate(
            user._id,
            { password: hashedPassword, verification_code: forgotTokenLink },
            { returnOriginal: false }
          );

          if (!newData) {
            return responseHandler.error(res);
          } else {
            return responseHandler.success(
              res,
              userResponse(newData),
              "Password reset successfully."
            );
          }
        } catch (error) {
          console.log(error);
          return responseHandler.error(res);
        }
      }
    });
  } catch (error) {
    console.log(error);
    return responseHandler.serverError(res);
  }
});

module.exports = router;

