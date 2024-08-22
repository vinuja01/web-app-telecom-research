const mongoose = require("mongoose");

const userAssignSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const UserAssign = mongoose.model("UserAssign", userAssignSchema);

module.exports = UserAssign;
