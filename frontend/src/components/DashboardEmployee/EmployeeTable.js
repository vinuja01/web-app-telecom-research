import React, { useState, useEffect } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ViewEmployee from "../DashboardEmployee/EmployerCRUD/ViewEmployee";
import TasksEmployee from "../DashboardEmployee/EmployerCRUD/TasksEmployee";
import UpdateEmployee from "../DashboardEmployee/EmployerCRUD/UpdateEmployee";
import DeleteEmployee from "../DashboardEmployee/EmployerCRUD/DeleteEmployee";
import BarChartComponent from "../DashboardEmployee/EmployerCRUD/BarChart"; // Ensure this path is correct

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [openView, setOpenView] = useState(false);
  const [openTasks, setOpenTasks] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedEmployeeData, setSelectedEmployeeData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/employees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const handleOpenView = (employeeId) => {
    const employee = employees.find((emp) => emp._id === employeeId);
    if (employee) {
      setSelectedEmployee(employee); // Set the selected employee here
      axios
        .get(`http://localhost:5000/employees/hoursByLocation/${employeeId}`)
        .then((response) => {
          const dataPoints = response.data.map((item) => ({
            label: item._id, // location name
            y: item.totalHours,
          }));
          setSelectedEmployeeData(dataPoints);
          setOpenView(true);
        })
        .catch((error) =>
          console.error("Error fetching employee details: ", error)
        );
    }
  };

  const handleCloseView = () => setOpenView(false);

  const handleOpenTasks = (employee) => {
    setSelectedEmployee(employee);
    setOpenTasks(true);
  };
  const handleCloseTasks = () => setOpenTasks(false);

  const handleOpenUpdate = (employee) => {
    setSelectedEmployee(employee);
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => setOpenUpdate(false);

  const handleOpenDelete = (employee) => {
    setSelectedEmployee(employee);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => setOpenDelete(false);

  return (
    <div className="container p-1 mx-auto sm:p-4 dark:text-gray-800">
      <div>
        <p className="text-1xl font-bold text-red">
          <i>Total Maintenance Employees: {employees.length}</i>
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs text-center">
          <thead style={{ backgroundColor: "#508C9B" }}>
            <tr>
              <th
                className="p-3"
                style={{
                  color: "white",
                  fontSize: "15px",
                  borderTopLeftRadius: "7px",
                }}
              >
                Employee ID
              </th>
              <th className="p-3" style={{ color: "white", fontSize: "15px" }}>
                Employee Name
              </th>
              <th className="p-3" style={{ color: "white", fontSize: "15px" }}>
                Designation
              </th>
              <th
                className="p-3"
                style={{
                  color: "white",
                  fontSize: "15px",
                  borderTopRightRadius: "4px",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr
                key={employee._id}
                className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
              >
                <td
                  className="p-3"
                  style={{
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  {employee._id}
                </td>
                <td
                  className="p-3"
                  style={{ color: "black", fontSize: "14px" }}
                >
                  {employee.employeeName}
                </td>
                <td
                  className="p-3"
                  style={{ color: "black", fontSize: "14px" }}
                >
                  {employee.designation}
                </td>
                <td className="p-3 text-center">
                  <div className="flex space-x-2 justify-center">
                    <button
                      type="button"
                      className="px-4 py-1 font-semibold rounded-full dark:bg-green-800 dark:text-gray-100"
                      onClick={() => handleOpenView(employee._id)}
                    >
                      View
                    </button>
                    <button
                      type="button"
                      className="px-4 py-1 font-semibold rounded-full dark:bg-purple-800 dark:text-gray-100"
                      onClick={() => handleOpenTasks(employee)}
                    >
                      Tasks
                    </button>
                    <button
                      type="button"
                      className="px-4 py-1 font-semibold rounded-full dark:bg-blue-800 dark:text-gray-100"
                      onClick={() => handleOpenUpdate(employee)}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="px-4 py-1 font-semibold rounded-full dark:bg-red-800 dark:text-gray-100"
                      onClick={() => handleOpenDelete(employee)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Dialog
          open={openView}
          onClose={handleCloseView}
          fullWidth={true}
          maxWidth="xl"
        >
          <DialogContent>
            <BarChartComponent
              dataPoints={selectedEmployeeData}
              employeeName={
                selectedEmployee ? selectedEmployee.employeeName : ""
              }
            />
          </DialogContent>
        </Dialog>
        <Dialog
          open={openTasks}
          onClose={handleCloseTasks}
          fullWidth={true}
          maxWidth="xl"
        >
          <DialogContent>
            <TasksEmployee employee={selectedEmployee} />
          </DialogContent>
        </Dialog>
        <Dialog
          open={openUpdate}
          onClose={handleCloseUpdate}
          fullWidth={true}
          maxWidth="xs"
        >
          <DialogContent>
            <UpdateEmployee employee={selectedEmployee} />
          </DialogContent>
        </Dialog>
        <Dialog
          open={openDelete}
          onClose={handleCloseDelete}
          fullWidth={true}
          maxWidth="xs"
        >
          <DialogContent>
            <DeleteEmployee employee={selectedEmployee} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EmployeeTable;
