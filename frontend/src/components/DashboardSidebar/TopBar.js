import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../../Assets/logo.jpg";
import site360 from "../../Assets/site360.png";
// import userIcon from "../../Assets/user-icon.png"; // Assuming you have a user icon asset

const TopBar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

  return (
    <nav
      className="border-gray-300 fixed z-50 w-full bg-gray-300"
      style={{ height: "60px" }}
    >
      <div className="px-4 flex h-full items-center justify-between">
        <div className="flex items-center">
          <img src={site360} className="h-10 mr-3" alt="Site 360 Logo" />
          <p className="text-xl font-bold">Site 360</p>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <div className="flex items-center">
            <img
              src={site360}
              alt="User"
              className="h-8 w-8 rounded-full mr-2"
            />
            <div className="text-right">
              <div className="text-xs font-semibold">
                {user ? user.name : "No User"}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopBar;
