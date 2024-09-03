import React from "react";

const DeleteEmployee = () => {
  return (
    <div className="flex flex-col max-w-md gap-2 p-6 rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
      <h2 className="text-xl font-semibold leading-tight tracking-wide">
        Do you really want to delete?
      </h2>

      <div className="flex flex-col justify-center gap-3 mt-6 sm:flex-row">
        <button className="px-6 py-2 rounded-sm">Cancel</button>
        <button className="px-6 py-2 rounded-sm shadow-sm dark:bg-violet-600 dark:text-gray-50">
          Agree
        </button>
      </div>
    </div>
  );
};

export default DeleteEmployee;
