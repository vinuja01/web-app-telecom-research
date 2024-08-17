// siteRoutes.js
const express = require("express");
const router = express.Router();
const siteController = require("../controllers/siteController");

// Make sure to correct the endpoint if needed
router.get("/siteDetails", siteController.getUniqueSiteList);
// Route to get current faults by siteId
router.get("/sites/:siteId/faults", siteController.getCurrentFaultsBySiteId);

module.exports = router;
