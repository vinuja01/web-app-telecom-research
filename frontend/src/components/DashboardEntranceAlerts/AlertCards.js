import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AlertCards() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/alerts");
        setAlerts(response.data);
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 2xl:col-span-2">
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
            Telecommunication Site Entrance Alerts
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className=" p-4 rounded-lg shadow transition duration-300 ease-in-out hover:shadow-lg"
            style={{ backgroundColor: "#E9EED9" }}
          >
            <p style={{ color: "#6F42C1 " }}>
              <strong>User:</strong> {alert.user}
            </p>
            <p style={{ color: "red" }}>
              <strong>Confidence:</strong> {alert.confidence}%
            </p>
            <p style={{ color: "#007BFF" }}>
              <strong>Time:</strong>{" "}
              {new Date(alert.timestamp).toLocaleString()}
            </p>
            <p style={{ color: "#28A745 " }}>
              <strong>Location:</strong> Hanwella
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
