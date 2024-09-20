import React, { useState, useEffect } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const MaintenanceRecords = ({ site }) => {
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);

  useEffect(() => {
    if (site && site.siteId) {
      axios
        .get(`http://localhost:5000/sites/maintenance-records/${site.siteId}`)
        .then((response) => {
          setMaintenanceRecords(response.data.maintenanceRecords || []);
        })
        .catch((error) => {
          console.error("Error fetching maintenance records:", error);
        });
    }
  }, [site]);

  const handleDeleteClick = (record) => {
    setRecordToDelete({ record: record, siteId: site.siteId });
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleConfirmDelete = () => {
    if (!recordToDelete) return;

    axios
      .delete(
        `http://localhost:5000/sites/maintenance-records/${recordToDelete.record}/${recordToDelete.siteId}`
      )
      .then(() => {
        setMaintenanceRecords((prevRecords) =>
          prevRecords.filter((item) => item !== recordToDelete.record)
        );
      })
      .catch((error) => {
        console.error("Error deleting the record:", error);
      })
      .finally(() => {
        setOpenConfirm(false);
        setRecordToDelete(null);
      });
  };

  return (
    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs text-center">
          <thead className="dark:bg-gray-300">
            <tr>
              <th className="p-3">Record Number</th>
              <th className="p-3">Site ID</th>
              <th className="p-3">Maintenance Records</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {maintenanceRecords.map((record, index) => (
              <tr key={index}>
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{site.siteId}</td>
                <td className="p-3">{record}</td>
                <td className="p-3">
                  <button
                    type="button"
                    className="px-4 py-1 font-semibold rounded-full dark:bg-gray-800 dark:text-gray-100"
                    onClick={() => handleDeleteClick(record)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={openConfirm} onClose={handleCloseConfirm}>
        <DialogTitle>{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this maintenance record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MaintenanceRecords;
