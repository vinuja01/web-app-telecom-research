// config/emailConfig.js
const nodemailer = require("nodemailer");
require("dotenv").config();

// Configure the transporter with environment variables
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE, // e.g., 'Gmail'
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

// Verify the transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Error configuring email transporter:", error);
  } else {
    console.log("Email transporter is ready to send messages.");
  }
});

module.exports = transporter;
