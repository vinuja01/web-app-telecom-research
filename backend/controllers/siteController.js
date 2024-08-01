// controllers/siteController.js
const Site = require("../models/Site");

exports.getSites = async (req, res) => {
  try {
    const sites = await Site.find();
    res.json(sites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
