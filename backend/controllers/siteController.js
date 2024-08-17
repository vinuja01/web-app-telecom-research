const Site = require("../models/Site");

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
        },
      },
    ]);

    if (!result || result.length === 0) {
      return res
        .status(404)
        .json({ message: "No faults found for the specified siteId" });
    }

    res.json({ siteId: result[0]._id, currentFaults: result[0].currentFaults });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
