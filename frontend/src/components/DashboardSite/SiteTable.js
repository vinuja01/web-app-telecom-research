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
      <div className="text-1xl font-bold text-red">
        <p>
          <i>Total Telecommunication Sites: {sites.length}</i>
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs text-center">
          <thead
            style={{ backgroundColor: "#508C9B" }}
            className="dark:bg-gray-300"
          >
            <tr>
              <th
                style={{
                  color: "white",
                  fontSize: "15px",
                  borderTopLeftRadius: "7px",
                }}
                className="p-3"
              >
                Site ID
              </th>
              <th style={{ color: "white", fontSize: "15px" }} className="p-3">
                Site Location
              </th>
              <th
                style={{
                  color: "white",
                  fontSize: "15px",
                  borderTopRightRadius: "7px",
                }}
                className="p-3"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site) => (
              <tr
                key={site.siteId}
                className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
              >
                <td
                  style={{
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                  className="p-3"
                >
                  {site.siteId}
                </td>
                <td
                  style={{ color: "black", fontSize: "14px" }}
                  className="p-3"
                >
                  {site.siteLocation}
                </td>
                <td
                  style={{ color: "black", fontSize: "14px" }}
                  className="p-3 text-center"
                >
                  <div className="flex space-x-2 justify-center">
                    <button
                      type="button"
                      //className="px-4 py-1 font-semibold rounded-full dark:bg-blue-800 dark:text-gray-100"
                      onClick={() => handleOpenMaintenance(site)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="green"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      //className="px-4 py-1 font-semibold rounded-full dark:bg-red-800 dark:text-gray-100"
                      onClick={() => handleOpenFaults(site)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="red"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
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
