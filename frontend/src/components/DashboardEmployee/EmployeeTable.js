import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ViewEmployee from "../DashboardEmployee/EmployerCRUD/ViewEmployee";
import TasksEmployee from "../DashboardEmployee/EmployerCRUD/TasksEmployee";
import UpdateEmployee from "./EmployerCRUD/UpdateEmployee";
import DeleteEmployee from "./EmployerCRUD/DeleteEmployee";

const EmployeeTable = () => {
  const [openView, setOpenView] = useState(false);
  const [openTasks, setOpenTasks] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false); // State for Update dialog
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenView = () => setOpenView(true);
  const handleCloseView = () => setOpenView(false);

  const handleOpenTasks = () => setOpenTasks(true);
  const handleCloseTasks = () => setOpenTasks(false);

  const handleOpenUpdate = () => setOpenUpdate(true); // Handler for Update dialog
  const handleCloseUpdate = () => setOpenUpdate(false);

  const handleOpenDelete = () => setOpenDelete(true); // Handler for Update dialog
  const handleCloseDelete = () => setOpenDelete(false);

  return (
    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs text-center">
          <colgroup>
            <col />
            <col />
            <col />
            <col className="w-40" />
          </colgroup>
          <thead className="dark:bg-gray-300">
            <tr className="text-center">
              <th className="p-3">Employee ID</th>
              <th className="p-3">Employee Name</th>
              <th className="p-3">Designation</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
              <td className="p-3">
                <p>001</p>
              </td>
              <td className="p-3">
                <p>John Doe</p>
              </td>
              <td className="p-3">
                <p className="dark:text-gray-600">Electrical Engineer</p>
              </td>
              <td className="p-3 text-center">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      className="px-4 py-1 font-semibold rounded-full dark:bg-gray-800 dark:text-gray-100"
                      onClick={handleOpenView}
                    >
                      View
                    </button>
                    <Dialog
                      open={openView}
                      onClose={handleCloseView}
                      fullWidth={true}
                      maxWidth="xl"
                    >
                      <DialogContent>
                        <ViewEmployee />
                      </DialogContent>
                    </Dialog>

                    <button
                      type="button"
                      className="px-4 py-1 font-semibold rounded-full dark:bg-gray-800 dark:text-gray-100"
                      onClick={handleOpenTasks}
                    >
                      Tasks
                    </button>
                    <Dialog
                      open={openTasks}
                      onClose={handleCloseTasks}
                      fullWidth={true}
                      maxWidth="xl"
                    >
                      <DialogContent>
                        <TasksEmployee />
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      className="px-4 py-1 font-semibold rounded-full dark:bg-gray-800 dark:text-gray-100"
                      onClick={handleOpenUpdate}
                    >
                      Update
                    </button>
                    <Dialog
                      open={openUpdate}
                      onClose={handleCloseUpdate}
                      fullWidth={true}
                      maxWidth="xs"
                    >
                      <DialogContent>
                        <UpdateEmployee />
                      </DialogContent>
                    </Dialog>
                    <button
                      type="button"
                      className="px-4 py-1 font-semibold rounded-full dark:bg-gray-800 dark:text-gray-100"
                      onClick={handleOpenDelete}
                    >
                      Delete
                    </button>
                    <Dialog
                      open={openDelete}
                      onClose={handleCloseDelete}
                      fullWidth={true}
                      maxWidth="xs"
                    >
                      <DialogContent>
                        <DeleteEmployee />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
