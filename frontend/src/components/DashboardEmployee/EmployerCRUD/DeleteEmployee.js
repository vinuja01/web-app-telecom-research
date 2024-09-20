import React from "react";
import axios from "axios";

const DeleteEmployee = ({ employee, onClose, onEmployeeDeleted }) => {
  const handleCancel = () => {
    // Function to close the dialog without deleting
    onClose();
  };

  const handleDelete = () => {
    // Construct the URL with the employee ID
    const deleteUrl = `http://localhost:5000/employees/delete/${employee._id}`;
    axios
      .delete(deleteUrl)
      .then((response) => {
        alert("Employee deleted successfully!");
        console.log(response.data);
        onEmployeeDeleted(employee._id); // Notify parent component to update the state
        onClose(); // Close the dialog
      })
      .catch((error) => {
        alert("Failed to delete employee!");
        console.error("Error deleting employee:", error);
      });
  };

  return (
    <div className="flex flex-col max-w-md gap-2 p-6 rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
      <h2 className="text-xl font-semibold leading-tight tracking-wide">
        Do you really want to delete?
      </h2>

      <div className="flex flex-col justify-center gap-3 mt-6 sm:flex-row">
        <button
          className="px-6 py-2 rounded-sm shadow-sm dark:bg-violet-600 dark:text-gray-50"
          onClick={handleDelete}
        >
          Agree
        </button>
      </div>
    </div>
  );
};

export default DeleteEmployee;
