import React from "react";
import logo from "../../Assets/logo.jpg";

const TopBar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 fixed z-10 w-full">
      <div className="px-2 py-2 lg:px-3">
        {" "}
        {/* Reduced padding */}
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <a
              href="#"
              className="text-xl font-bold flex items-center lg:ml-2.5"
            >
              <img src={logo} className="h-10 mr-3 ml-3" alt="Logo" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
