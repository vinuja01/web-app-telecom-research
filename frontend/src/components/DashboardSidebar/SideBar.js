// frontend/src/components/SideBar.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TopBar from "./TopBar";
import logo from "../../Assets/logo.jpg";
import axios from "axios";

const SideBar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors

  useEffect(() => {
    // Function to fetch user data
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/auth/user", {
          headers: {
            "x-auth-token": token,
          },
        });
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data. Please log in again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Handle loading state
  if (loading) {
    return (
      <div>
        <TopBar />
        <aside
          id="sidebar"
          className="fixed hidden z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
          style={{ borderRadius: "10px" }}
          aria-label="Sidebar"
        >
          <div className="relative flex-1 flex flex-col min-h-0 border-radius-9 border-gray-200 bg-gray-300 pt-0">
            <div className="flex-3 flex flex-col pt-1 pb-1 overflow-y-auto">
              <div className="flex-9 px-1 bg-gray divide-y space-y-1">
                <ul className="space-y-14 pb-5">
                  {/* Loading Indicator */}
                  <li>Loading sidebar...</li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div>
        <TopBar />
        <aside
          id="sidebar"
          className="fixed hidden z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
          style={{ borderRadius: "10px" }}
          aria-label="Sidebar"
        >
          <div className="relative flex-1 flex flex-col min-h-0 border-radius-9 border-gray-200 bg-gray-300 pt-0">
            <div className="flex-3 flex flex-col pt-1 pb-1 overflow-y-auto">
              <div className="flex-9 px-1 bg-gray divide-y space-y-1">
                <ul className="space-y-14 pb-5">
                  {/* Error Message */}
                  <li>{error}</li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
      </div>
    );
  }

  // Main Sidebar Content
  return (
    <div>
      <TopBar />
      <aside
        id="sidebar"
        className="fixed hidden z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
        style={{ borderRadius: "10px" }}
        aria-label="Sidebar"
      >
        <div className="relative flex-1 flex flex-col min-h-0 border-radius-9 border-gray-200 bg-gray-300 pt-0">
          <div className="flex-3 flex flex-col pt-1 pb-1 overflow-y-auto">
            <div className="flex-9 px-1 bg-gray divide-y space-y-1">
              <ul className="space-y-14 pb-5">
                <li>
                  <form action="#" method="GET" className="lg:hidden">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="search"
                        id="mobile-search"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 p-2.5"
                        placeholder="Search"
                      />
                    </div>
                  </form>
                </li>
                <div className="flex flex-col justify-center max-w-l p-1 h-20 shadow-md rounded-xl sm:px-9 dark:bg-gray-50 dark:text-gray-800">
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-10 h-10 mx-auto rounded-full dark:bg-gray-500 aspect-square"
                  />
                  <div className="space-y-4 text-center divide-y dark:divide-gray-300">
                    <div className="my-2 space-y-1">
                      <h6 className="text-xs font-semibold sm:text-sm">
                        {user ? user.name : "Loading..."}
                      </h6>
                    </div>
                  </div>
                </div>
                <li>
                  <Link
                    to="/dashboard"
                    className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
                  >
                    <svg
                      className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                    </svg>
                    <span className="ml-3">Dashboard</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/employee"
                    className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                  >
                    <svg
                      className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                    </svg>
                    <span className="ml-3 flex-1 whitespace-nowrap">
                      Employee Details
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/site"
                    className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                  >
                    <svg
                      className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="ml-3 flex-1 whitespace-nowrap">
                      Site Details
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/user assign"
                    className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                  >
                    <svg
                      className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="ml-3 flex-1 whitespace-nowrap">
                      User Assign
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/logout"
                    className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group"
                    onClick={() => {
                      // Optionally, redirect to login page
                      window.location.href = "/login";
                    }}
                  >
                    <svg
                      className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H4a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="ml-3 flex-1 whitespace-nowrap">
                      Log Out
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
