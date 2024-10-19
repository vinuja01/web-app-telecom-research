// frontend/src/components/SideBar.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TopBar from "./TopBar";
// import logo from "../../Assets/logo.jpg";
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

  // Main Sidebar Content
  return (
    <div>
      <TopBar />
      <aside
        id="sidebar"
        className="fixed hidden z-30 h-full top-0 bottom-9 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
        style={{ borderRadius: "12px" }}
        aria-label="Sidebar"
      >
        <div
          style={{ backgroundColor: "#3C5B6F" }}
          className="relative flex-1 flex flex-col min-h-10 border-radius-10 border-gray-200  pt-0"
        >
          <div className="flex-3 flex flex-col pt-0 pb-0 overflow-y-auto">
            <div className="flex-9 bg-gray divide-y space-y-7 ">
              <ul className="space-y-10 space-x-0 pb-7">
                <li>
                  <form action="#" method="GET" className="lg:hidden">
                    <div className="relative">
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

                <li>
                  <Link
                    to="/dashboard"
                    className="text-base font-normal rounded-lg flex items-center p-2 hover:bg-blue-500 group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="black"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <span className="ml-3 text-white font-bold group-hover:text-black">
                      Dashboard
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/employee"
                    className="text-base font-normal rounded-lg flex items-center p-2 hover:bg-blue-500 group "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="black"
                      className="size-6"
                    >
                      <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                    </svg>

                    <span className="ml-3 text-white font-bold group-hover:text-black">
                      Employee Details
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/site"
                    className="text-base font-normal rounded-lg flex items-center p-2 hover:bg-blue-500 group "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="black"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.636 4.575a.75.75 0 0 1 0 1.061 9 9 0 0 0 0 12.728.75.75 0 1 1-1.06 1.06c-4.101-4.1-4.101-10.748 0-14.849a.75.75 0 0 1 1.06 0Zm12.728 0a.75.75 0 0 1 1.06 0c4.101 4.1 4.101 10.75 0 14.85a.75.75 0 1 1-1.06-1.061 9 9 0 0 0 0-12.728.75.75 0 0 1 0-1.06ZM7.757 6.697a.75.75 0 0 1 0 1.06 6 6 0 0 0 0 8.486.75.75 0 0 1-1.06 1.06 7.5 7.5 0 0 1 0-10.606.75.75 0 0 1 1.06 0Zm8.486 0a.75.75 0 0 1 1.06 0 7.5 7.5 0 0 1 0 10.606.75.75 0 0 1-1.06-1.06 6 6 0 0 0 0-8.486.75.75 0 0 1 0-1.06ZM9.879 8.818a.75.75 0 0 1 0 1.06 3 3 0 0 0 0 4.243.75.75 0 1 1-1.061 1.061 4.5 4.5 0 0 1 0-6.364.75.75 0 0 1 1.06 0Zm4.242 0a.75.75 0 0 1 1.061 0 4.5 4.5 0 0 1 0 6.364.75.75 0 0 1-1.06-1.06 3 3 0 0 0 0-4.243.75.75 0 0 1 0-1.061ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <span className="ml-3 text-white font-bold group-hover:text-black">
                      Site Details
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/entrance alerts"
                    className="text-base font-normal rounded-lg flex items-center p-2 hover:bg-blue-500 group "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="black"
                      className="size-6"
                    >
                      <path d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z" />
                      <path
                        fillRule="evenodd"
                        d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <span className="ml-3 text-white font-bold group-hover:text-black">
                      Entrance Alerts
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/user assign"
                    className="text-base font-normal rounded-lg flex items-center p-2 hover:bg-blue-500 group "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="black"
                      className="size-6"
                    >
                      <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                    </svg>

                    <span className="ml-3 text-white font-bold group-hover:text-black">
                      User Assign
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/"
                    className="text-base font-normal rounded-lg flex items-center p-2 hover:bg-blue-500 group"
                    onClick={() => {
                      // Optionally, redirect to login page
                      window.location.href = "/";
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="black"
                      className="size-6"
                    >
                      <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                    </svg>

                    <span className="ml-3 text-white font-bold group-hover:text-black">
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
