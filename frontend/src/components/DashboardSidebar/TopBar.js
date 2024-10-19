import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../../Assets/logo.jpg";
import site360 from "../../Assets/site360.png";
import image from "../../Assets/image.png";
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
      style={{ backgroundColor: "#3C5B6F", height: "65px" }}
      className="border-gray-300 fixed z-65 w-full bg-gray-300"
    >
      <div className="px-5 flex h-full items-center justify-between">
        <div className="flex items-center ml-12">
          <img src={site360} className="h-12 mr-2" alt="Site 360 Logo" />
        </div>
        <div>
          <p className="text-3xl font-bold text-white">Site 360°</p>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <div className="flex items-center">
            <img src={image} alt="User" className="h-8 w-8 rounded-full mr-2" />
            <div className="text-right">
              <div className="text-xs font-bold text-white">
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
