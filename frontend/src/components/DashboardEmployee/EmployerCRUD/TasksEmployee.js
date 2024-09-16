import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";

const TasksEmployee = ({ employee, handleClose }) => {
  const [tasks, setTasks] = useState([]);

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

  const handleDeleteTask = async (taskIndex, siteLocation, employeeId) => {
    try {
      // Construct the URL with proper parameters
      const url = `http://localhost:5000/tasks/${siteLocation}/${employeeId}/${taskIndex}`;
      const response = await axios.delete(url);

      if (response.status === 200) {
        // Remove the task from the state to update the UI
        setTasks((prevTasks) =>
          prevTasks.filter((_, index) => index !== taskIndex)
        );
        console.log("Task deleted successfully:", taskIndex);
      } else {
        console.error("Failed to delete task:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting task:", taskIndex, error);
    }
  };

  return (
    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
      <h2 className="mb-4 text-2xl font-semibold leading-tight">
        Tasks for Employee {employee?.employeeName}
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead className="dark:bg-gray-300">
            <tr className="text-left">
              <th className="p-3">Task</th>
              <th className="p-3">Date</th>
              <th className="p-3">Site Location</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task._id}>
                <td className="p-3">{task.task}</td>
                <td className="p-3">
                  {new Date(task.date).toLocaleDateString()}
                </td>
                <td className="p-3">{task.siteLocation}</td>
                <td className="p-3 text-center">
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      onClick={() =>
                        handleDeleteTask(index, task.siteLocation, employee._id)
                      }
                    >
                      Delete
                    </Button>
                  </Stack>
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
