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
                      //className="px-4 py-1 font-semibold rounded-full dark:bg-green-800 dark:text-gray-100"
                      onClick={() => handleOpenView(employee._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="green"
                        className="size-6"
                      >
                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                        <path
                          fillRule="evenodd"
                          d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      //className="px-4 py-1 font-semibold rounded-full dark:bg-purple-800 dark:text-gray-100"
                      onClick={() => handleOpenTasks(employee)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="purple"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      //className="px-4 py-1 font-semibold rounded-full dark:bg-blue-800 dark:text-gray-100"
                      onClick={() => handleOpenUpdate(employee)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="blue"
                        className="size-6"
                      >
                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      //className="px-4 py-1 font-semibold rounded-full dark:bg-red-800 dark:text-gray-100"
                      onClick={() => handleOpenDelete(employee)}
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
