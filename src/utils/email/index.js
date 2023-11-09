const nodemailer = require('nodemailer');
require("dotenv/config");

exports.transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
     user: process.env.NODEMAILER_USERNAME,
     pass: process.env.NODEMAILER_PASSWORD,
  },
});