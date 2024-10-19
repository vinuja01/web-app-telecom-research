import React from "react";
import SiteTable from "./SiteTable";

const SiteView = () => {
  return (
    <div
      style={{ backgroundColor: "#EEEEEE" }}
      class=" shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2"
    >
      <div class="flex items-center justify-center mb-2">
        <div
          className="flex justify-center items-center mb-4"
          style={{ height: "100%" }}
        >
          {" "}
          {/* Ensures full height centering */}
          <span
            style={{ color: "#074173" }}
            className="text-xl sm:text-2xl font-bold"
          >
            Telecommunication Site Details
          </span>
        </div>
      </div>
      <SiteTable />
    </div>
  );
};

export default SiteView;
