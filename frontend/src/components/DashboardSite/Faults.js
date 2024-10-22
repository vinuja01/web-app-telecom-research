import React, { useState, useEffect } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";

const Faults = ({ siteId }) => {
  const [faultsData, setFaultsData] = useState({
    siteId: "",
    currentFaults: [],
    Date: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [faultToDelete, setFaultToDelete] = useState("");

  useEffect(() => {
    if (siteId) {
      axios
        .get(`http://localhost:5000/sites/faults/${siteId}`)
        .then((response) => {
          setFaultsData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching faults data:", error);
        });
    }
  }, [siteId]);

  const handleDeleteClick = (fault) => {
    setFaultToDelete(fault);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`http://localhost:5000/sites/faults/${faultToDelete}/${siteId}`)
      .then(() => {
        setFaultsData((prev) => ({
          ...prev,
          currentFaults: prev.currentFaults.filter((f) => f !== faultToDelete),
        }));
        setOpenDialog(false);
      })
      .catch((error) => {
        console.error("Error deleting the fault:", error);
      });
  };

  return (
    <div className="container p-1 mx-auto sm:p-1 dark:text-gray-800">
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
                Fault Number
              </th>
              <th style={{ color: "white", fontSize: "15px" }} className="p-3">
                Site ID
              </th>
              <th style={{ color: "white", fontSize: "15px" }} className="p-3">
                Faults
              </th>
              <th style={{ color: "white", fontSize: "15px" }} className="p-3">
                Date
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
            {faultsData.currentFaults.map((fault, index) => (
              <tr
                key={index}
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
                  {index + 1}
                </td>
                <td
                  style={{ color: "black", fontSize: "14px" }}
                  className="p-3"
                >
                  {faultsData.siteId}
                </td>
                <td
                  style={{ color: "black", fontSize: "14px" }}
                  className="p-3"
                >
                  {fault}
                </td>
                <td
                  style={{ color: "black", fontSize: "14px" }}
                  className="p-3"
                >
                  {new Date(faultsData.Date).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <button
                    type="button"
                    //className="px-4 py-1 font-semibold rounded-full dark:bg-red-800 dark:text-gray-100"
                    onClick={() => handleDeleteClick(fault)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="red"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this fault?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Faults;
