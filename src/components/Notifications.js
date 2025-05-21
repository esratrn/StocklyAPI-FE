import React, { useEffect, useState } from "react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

// Bildirim bileşeni
const Notification = ({ type = "info", message }) => {
  const iconMap = {
    success: <CheckCircleIcon className="h-6 w-6 mr-3" />,
    warning: <ExclamationTriangleIcon className="h-6 w-6 mr-3" />,
    danger: <XCircleIcon className="h-6 w-6 mr-3" />,
    info: <InformationCircleIcon className="h-6 w-6 mr-3" />,
  };

  const colorMap = {
    success: "bg-green-500",
    warning: "bg-yellow-400",
    danger: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <div
      className={`px-6 py-4 text-white flex justify-between items-center rounded shadow ${colorMap[type]}`}
    >
      <div className="flex items-center">
        {iconMap[type]}
        <p>{message}</p>
      </div>
    </div>
  );
};

// API'den veri çeken versiyon
const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://localhost:7080/api/Notifications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Fail to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="space-y-4 p-8 pt-16 min-h-screen bg-gray-500">
      {notifications.length === 0 ? (
        <p className="text-white">No notifications available</p>
      ) : (
        notifications.map((n) => (
          <Notification key={n.id} type={n.type} message={n.message} />
        ))
      )}
    </div>
  );
};

export default Notifications;

