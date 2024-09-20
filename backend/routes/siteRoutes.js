// siteRoutes.js
const express = require("express");
const router = express.Router();
const siteController = require("../controllers/siteController");

// Make sure to correct the endpoint if needed
router.get("/siteDetails", siteController.getUniqueSiteList);
// Route to get current faults by siteId
router.get("/faults/:siteId", siteController.getCurrentFaultsBySiteId);
router.delete("/faults/:fault/:siteId", siteController.deleteFaultBySiteId);
router.get(
  "/maintenance-records/:siteId",
  siteController.getMaintenanceRecordsBySiteId
);
// DELETE a specific maintenance record by siteId and record name
router.delete(
  "/maintenance-records/:record/:siteId",
  siteController.deleteMaintenanceRecordBySiteId
);

module.exports = router;
