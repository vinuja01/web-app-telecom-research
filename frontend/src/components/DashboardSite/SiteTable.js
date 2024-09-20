import React, { useState, useEffect } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import MaintenanceRecords from "../DashboardSite/MaintenanceRecords";
import Faults from "../DashboardSite/Faults";

const SiteTable = () => {
  const [sites, setSites] = useState([]);
  const [openMaintenance, setOpenMaintenance] = useState(false);
  const [openFaults, setOpenFaults] = useState(false);
  const [selectedSite, setSelectedSite] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/sites/siteDetails")
      .then((response) => setSites(response.data))
      .catch((error) => console.error("Error fetching sites:", error));
  }, []);

  const handleOpenMaintenance = (site) => {
    setSelectedSite(site);
    setOpenMaintenance(true);
  };

  const handleCloseMaintenance = () => {
    setOpenMaintenance(false);
  };

  const handleOpenFaults = (site) => {
    setSelectedSite(site);
    setOpenFaults(true);
  };

  const handleCloseFaults = () => {
    setOpenFaults(false);
  };

  return (
    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs text-center">
          <thead className="dark:bg-gray-300">
            <tr>
              <th className="p-3">Site ID</th>
              <th className="p-3">Site Location</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site) => (
              <tr key={site.siteId}>
                <td className="p-3">{site.siteId}</td>
                <td className="p-3">{site.siteLocation}</td>
                <td className="p-3 text-center">
                  <div className="flex space-x-2 justify-center">
                    <button
                      type="button"
                      className="px-4 py-1 font-semibold rounded-full dark:bg-gray-800 dark:text-gray-100"
                      onClick={() => handleOpenMaintenance(site)}
                    >
                      Maintenance Records
                    </button>
                    <button
                      type="button"
                      className="px-4 py-1 font-semibold rounded-full dark:bg-gray-800 dark:text-gray-100"
                      onClick={() => handleOpenFaults(site)}
                    >
                      Faults
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Dialog
          open={openMaintenance}
          onClose={handleCloseMaintenance}
          fullWidth={true}
          maxWidth="xl"
        >
          <DialogContent>
            <MaintenanceRecords site={selectedSite} />
          </DialogContent>
        </Dialog>
        <Dialog
          open={openFaults}
          onClose={handleCloseFaults}
          fullWidth={true}
          maxWidth="xl"
        >
          <DialogContent>
            <Faults siteId={selectedSite ? selectedSite.siteId : null} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SiteTable;
