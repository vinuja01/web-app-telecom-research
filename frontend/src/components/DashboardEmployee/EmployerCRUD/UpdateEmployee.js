import React, { useState } from "react";
import axios from "axios";

const UpdateEmployee = ({ employee }) => {
  // Initialize state with current employee details if available
  const [employeeName, setEmployeeName] = useState(
    employee?.employeeName || ""
  );
  const [designation, setDesignation] = useState(employee?.designation || "");

  const handleUpdate = (e) => {
    e.preventDefault();
    // Construct the URL with the employee ID
    const updateUrl = `http://localhost:5000/employees/update/${employee._id}`;
    axios
      .put(updateUrl, { employeeName, designation })
      .then((response) => {
        alert("Employee updated successfully!");
        console.log(response.data);
      })
      .catch((error) => {
        alert("Failed to update employee!");
        console.error("Error updating employee:", error);
      });
  };

  return (
    <div className="flex items-center justify-center text-center dark:bg-gray-50 dark:text-black-800">
      <form
        noValidate=""
        action=""
        className="flex flex-col w-full max-w-lg p-12 rounded shadow-lg dark:text-black-800"
        onSubmit={handleUpdate} // Attach the event handler here
      >
        <label htmlFor="empname" className="self-start text-xs font-semibold">
          Employee Name
        </label>
        <input
          id="empname"
          type="text"
          value={employeeName} // Bind state to input
          onChange={(e) => setEmployeeName(e.target.value)} // Update state on change
          className="flex items-center h-12 px-4 mt-2 rounded dark:text-black-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600"
        />
        <label
          htmlFor="designation"
          className="self-start text-xs font-semibold"
        >
          Designation
        </label>
        <input
          id="designation"
          type="text"
          value={designation} // Bind state to input
          onChange={(e) => setDesignation(e.target.value)} // Update state on change
          className="flex items-center h-12 px-4 mt-2 rounded dark:text-black-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600"
        />

        <button
          type="submit"
          className="flex items-center justify-center h-12 px-6 mt-8 text-sm font-semibold rounded dark:bg-violet-600 dark:text-gray-50"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
