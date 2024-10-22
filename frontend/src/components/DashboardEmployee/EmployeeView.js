import React from "react";
import EmployeeTable from "./EmployeeTable";

const EmployeeView = () => {
  return (
    <div
      style={{ backgroundColor: "#EEEEEE" }}
      className="shadow rounded-lg p-4 sm:p-6 xl:p-8 2xl:col-span-2"
    >
      <div
        className="flex justify-center items-center mb-4"
        style={{ height: "100%" }}
      >
        {" "}
        <span
          style={{ color: "#074173" }}
          className="text-xl sm:text-2xl font-bold"
        >
          Maintenance Teams Details
        </span>
      </div>
      <EmployeeTable />
    </div>
  );
};

export default EmployeeView;
