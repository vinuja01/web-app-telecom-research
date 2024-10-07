import React from "react";
import logo from "../../Assets/logo.jpg";
import site360 from "../../Assets/site360.png";

const TopBar = () => {
  return (
    <nav
      className="border-gray-300 fixed z-10 w-full bg-gray-300"
      style={{ height: "60px" }}
    >
      {" "}
      {/* Set specific height */}
      <div className="px-2 flex h-full items-center lg:px-9">
        {" "}
        {/* Ensure div fills nav height */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-start">
            <a
              href="#"
              className="text-xl font-bold flex items-center lg:ml-2.5"
            >
              <img src={site360} className="h-10 mr-3 ml-3" alt="Logo" />
            </a>
            <p>Site 360</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
