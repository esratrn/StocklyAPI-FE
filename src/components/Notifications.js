import React from "react";
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

// Örnek kullanım (App)
const App = () => {
  return (
    <div className="space-y-4 p-8 pt-16 min-h-screen bg-gray-500">
      <Notification type="success" message="✅ Yeni ürün başarıyla eklendi." />
      <Notification type="warning" message="⚠️ Stok seviyesi düşük." />
      <Notification type="danger" message="❌ Ürünün stoğu tükendi!" />
      <Notification type="info" message="ℹ️ Ürün bilgisi güncellendi." />
    </div>
  );
};

export default App;
