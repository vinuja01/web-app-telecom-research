import React from "react";
import UserForm from "./UserForm";

const UserView = () => {
  return (
    <div
      style={{ backgroundColor: "#E9EED9" }}
      className="shadow rounded-lg p-4 sm:p-6 xl:p-8 2xl:col-span-2"
    >
      <div className="flex items-center justify-center mb-5">
        <div className="flex  items-center h-full" style={{ height: "120%" }}>
          {" "}
          {/* Ensures full height centering */}
          <span
            style={{ color: "#074173" }}
            className="text-xl sm:text-2xl font-bold"
          >
            Handle Mobile App User Credentials
          </span>
        </div>
      </div>
      <UserForm />
    </div>
  );
};

export default UserView;
