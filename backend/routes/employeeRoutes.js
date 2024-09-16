// routes/employeeRoutes.js
const express = require("express");
const router = express.Router();
const {
  getUniqueEmployeeList,
  getTasksByEmployeeId,
  updateEmployee,
  deleteEmployee,
  getHoursByLocation,
  getTotalVisitsByLocation,
  deleteTaskById,
} = require("../controllers/employeeController");

router.get("/", getUniqueEmployeeList);
router.get("/tasks/:employeeId", getTasksByEmployeeId);
router.put("/update/:employeeId", updateEmployee);
router.delete("/delete/:employeeId", deleteEmployee);
router.get("/hoursByLocation/:employeeId", getHoursByLocation);
router.get("/visits-by-location", getTotalVisitsByLocation);
router.delete("/tasks/:siteLocation/:employeeId/:taskIndex", deleteTaskById);

module.exports = router;
