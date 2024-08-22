// siteRoutes.js
const express = require("express");
const router = express.Router();
const siteController = require("../controllers/siteController");

// Make sure to correct the endpoint if needed
router.get("/siteDetails", siteController.getUniqueSiteList);
// Route to get current faults by siteId
router.get("/sites/:siteId/faults", siteController.getCurrentFaultsBySiteId);
router.delete("/:siteId/faults/:fault", siteController.deleteFaultBySiteId);
router.get(
  "/:siteId/maintenance-records",
  siteController.getMaintenanceRecordsBySiteId
);
// DELETE a specific maintenance record by siteId and record name
router.delete(
  "/:siteId/maintenance-records/:record",
  siteController.deleteMaintenanceRecordBySiteId
);

module.exports = router;
