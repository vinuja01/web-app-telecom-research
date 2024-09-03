import React from "react";
import EmployeeTable from "./EmployeeTable";

const EmployeeView = () => {
  return (
    <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
      <div class="flex items-center justify-between mb-4">
        <div class="flex-shrink-0">
          <span class="text-xl sm:text-2xl leading-none font-bold text-gray-900">
            Reorder Report
          </span>
        </div>
      </div>
      <EmployeeTable />
    </div>
  );
};

export default EmployeeView;
