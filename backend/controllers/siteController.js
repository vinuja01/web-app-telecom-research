const Site = require("../models/Site");

//get site list
exports.getUniqueSiteList = async (req, res) => {
  try {
    const sites = await Site.aggregate([
      {
        $group: {
          _id: "$siteId", // Group by siteId
          siteLocation: { $first: "$siteLocation" },

          currentFaults: { $first: "$currentFaults" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json(
      sites.map((site) => ({
        siteId: site._id,
        siteLocation: site.siteLocation,
      }))
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get faults by each site id
exports.getCurrentFaultsBySiteId = async (req, res) => {
  try {
    const { siteId } = req.params;
    const result = await Site.aggregate([
      { $match: { siteId: siteId } },
      { $unwind: "$currentFaults" },
      {
        $group: {
          _id: "$siteId",
          currentFaults: { $push: "$currentFaults" },
          Date: { $first: "$Date" }, // Assuming date is in MaintenanceRecords array
        },
      },
    ]);

    if (!result || result.length === 0) {
      return res
        .status(404)
        .json({ message: "No faults found for the specified siteId" });
    }

    // Format the response to include the site ID, faults, and maintenance date
    res.json({
      siteId: result[0]._id,
      currentFaults: result[0].currentFaults,
      Date: result[0].Date, // Extracting and showing the date
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a specific fault by siteId and fault name
exports.deleteFaultBySiteId = async (req, res) => {
  try {
    const { siteId, fault } = req.params;

    const result = await Site.updateMany(
      { siteId: siteId },
      { $pull: { currentFaults: fault } }
    );

    if (result.modifiedCount === 0) {
      res.status(404).json({ message: "Fault not found or already deleted." });
    } else {
      res.json({
        message: `Fault deleted successfully from ${result.modifiedCount} documents.`,
      });
    }
  } catch (err) {
    console.error("Error during deletion:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get all maintenance records by each siteId
exports.getMaintenanceRecordsBySiteId = async (req, res) => {
  try {
    const { siteId } = req.params;
    const result = await Site.aggregate([
      { $match: { siteId: siteId } },
      { $unwind: "$MaintainanceRecords" },
      {
        $group: {
          _id: "$siteId",
          maintenanceRecords: { $push: "$MaintainanceRecords" },
          mostRecentDate: { $max: "$Date" },
        },
      },
    ]);

    if (!result || result.length === 0) {
      return res.status(404).json({
        message: "No maintenance records found for the specified siteId",
      });
    }

    res.json({
      siteId: result[0]._id,
      maintenanceRecords: result[0].maintenanceRecords,
      date: result[0].mostRecentDate,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteMaintenanceRecordBySiteId = async (req, res) => {
  try {
    const { siteId, record } = req.params;

    const result = await Site.updateMany(
      { siteId: siteId },
      { $pull: { MaintainanceRecords: record } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        message:
          "No maintenance record found with the specified name or already deleted.",
      });
    }

    res.status(200).json({
      message: "Maintenance record deleted successfully.",
    });
  } catch (err) {
    console.error("Error during deletion:", err);
    res.status(500).json({ message: err.message });
  }
};
