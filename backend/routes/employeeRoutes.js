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
  deleteTaskByIndex,
} = require("../controllers/employeeController");

router.get("/", getUniqueEmployeeList);
router.get("/:employeeId/tasks", getTasksByEmployeeId);
router.put("/:employeeId/update", updateEmployee);
router.delete("/:employeeId/delete", deleteEmployee);
router.get("/:employeeId/hoursByLocation", getHoursByLocation);
router.get("/visits-by-location", getTotalVisitsByLocation);
router.delete("/:employeeId/tasks/:taskIndex", deleteTaskByIndex);

module.exports = router;
