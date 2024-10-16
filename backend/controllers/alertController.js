// controllers/alertController.js
const Alert = require("../models/Alerts");

exports.getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find();
    res.json(alerts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching alerts", error: error.message });
  }
};
