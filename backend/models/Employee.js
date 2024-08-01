// models/Employee.js
const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  employeeId: String,
  employeeName: String,
  arrivalDate: Date,
  siteLocation: String,
  designation: String,
  tasksDone: [String],
  hoursSpent: Number,
});

module.exports = mongoose.model("Employee", EmployeeSchema);
