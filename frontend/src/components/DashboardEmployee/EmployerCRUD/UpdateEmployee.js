//import { StyleSheet, Text, View } from "react";
import React from "react";

const UpdateEmployee = () => {
  return (
    <div className="flex items-center justify-center text-center dark:bg-gray-50 dark:text-black-800">
      <form
        noValidate=""
        action=""
        className="flex flex-col w-full max-w-lg p-12 rounded shadow-lg dark:text-black-800"
      >
        <label htmlFor="empid" className="self-start text-xs font-semibold">
          Employee ID
        </label>
        <input
          id="empid"
          type="text"
          className="flex items-center h-12 px-4 mt-2 rounded dark:text-black-50 focus:outline-none focus:ring-2 focus:dark:border-violet-600 focus:dark:ring-violet-600"
        />
        <label htmlFor="empname" className="self-start text-xs font-semibold">
          Employee Name
        </label>
        <input
          id="empname"
          type="text"
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
