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
      <div className="flex items-center justify-between mb-4">
        <div className="flex-shrink-0">
          <span className="text-xl sm:text-2xl leading-none font-bold text-gray-900">
            Telecommunication Sites Entrance Alerts
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {alerts.map((alert, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow">
            <p>
              <strong>User:</strong> {alert.user}
            </p>
            <p>
              <strong>Confidence:</strong> {alert.confidence}%
            </p>
            <p>
              <strong>Time:</strong>{" "}
              {new Date(alert.timestamp).toLocaleString()}
            </p>
            <p>
              <strong>Location:</strong> Hanwella
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
