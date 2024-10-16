// models/Alert.js
const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    user: String,
    confidence: Number,
    timestamp: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Alert", alertSchema);
