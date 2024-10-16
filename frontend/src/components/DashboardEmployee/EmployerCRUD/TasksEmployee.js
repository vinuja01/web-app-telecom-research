import React, { useState, useEffect } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import SortIcon from "@mui/icons-material/Sort";

const TasksEmployee = ({ employee, handleClose }) => {
  const [tasks, setTasks] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); // initial sort order

  useEffect(() => {
    if (employee && employee._id) {
      axios
        .get(`http://localhost:5000/employees/tasks/${employee._id}`)
        .then((response) => {
          setTasks(response.data);
          console.log(
            "Tasks fetched for Employee:",
            employee._id,
            response.data
          );
        })
        .catch((error) => {
          console.error(
            "Failed to fetch tasks for Employee",
            employee._id,
            error
          );
        });
    }
  }, [employee]);

  useEffect(() => {
    // This effect runs whenever the sortOrder changes.
    const sortedTasks = [...tasks].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    setTasks(sortedTasks);
  }, [sortOrder]);

  const handleSortClick = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div
      style={{ backgroundColor: "#EEEEEE" }}
      className="container p-2 mx-auto sm:p-4 dark:text-gray-800"
    >
      <div className="flex justify-center items-center w-full">
        <h2 className="mb-4 text-2xl font-semibold leading-tight">
          Tasks for Employee {employee?.employeeName}
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead
            style={{ backgroundColor: "#508C9B" }}
            className="dark:bg-gray-300"
          >
            <tr
              style={{
                color: "white",
                fontSize: "15px",
                borderTopLeftRadius: "7px",
                borderTopRightRadius: "7px",
              }}
              className="text-left"
            >
              <th className="p-3" style={{ color: "white", fontSize: "15px" }}>
                Index
              </th>
              <th className="p-3" style={{ color: "white", fontSize: "15px" }}>
                Date
                <IconButton onClick={handleSortClick} color="secondary">
                  <SortIcon />
                </IconButton>
              </th>
              <th className="p-3" style={{ color: "white", fontSize: "15px" }}>
                Site Location
              </th>
              <th className="p-3" style={{ color: "white", fontSize: "15px" }}>
                Task
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td
                  className="p-3"
                  style={{ color: "black", fontSize: "15px" }}
                >
                  {index + 1}
                </td>
                <td
                  className="p-3"
                  style={{ color: "black", fontSize: "15px" }}
                >
                  {new Date(task.date).toLocaleDateString()}
                </td>
                <td
                  className="p-3"
                  style={{ color: "black", fontSize: "15px" }}
                >
                  {task.siteLocation}
                </td>
                <td
                  className="p-3"
                  style={{ color: "black", fontSize: "15px" }}
                >
                  {task.task}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TasksEmployee;
