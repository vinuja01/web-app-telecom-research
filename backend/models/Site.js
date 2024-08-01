// models/Site.js
const mongoose = require("mongoose");

const SiteSchema = new mongoose.Schema({
  siteId: String,
  siteLocation: String,
  currentFaults: [String],
  MaintenanceRecords: [String],
  Date: Date,
});

module.exports = mongoose.model("Site", SiteSchema);
