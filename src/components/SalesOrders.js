import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SalesOrders = () => {
  const [salesData, setSalesData] = useState([]);
  const [newPrice, setNewPrice] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newStatus, setNewStatus] = useState("Pending");
  const token = localStorage.getItem("token"); // token localStorage’dan alınır

  useEffect(() => {
    fetchSalesOrders();
  }, []);

  const fetchSalesOrders = async () => {
    try {
      const response = await axios.get("https://localhost:7080/api/SalesOrders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSalesData(response.data);
    } catch (error) {
      toast.error("Failed to fetch sales orders.");
    }
  };

  const handleAddOrder = async (e) => {
    e.preventDefault();
    if (!newPrice || !newDate) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
  "https://localhost:7080/api/SalesOrders",
  {
    userId: 1, // örnek userId
    orderDate: newDate,
    status: newStatus,
    price: parseFloat(newPrice), // ← price’ı da ekliyoruz
  },
  {
    headers: { Authorization: `Bearer ${token}` },
  }
);

      setSalesData([response.data, ...salesData]);
      setNewPrice("");
      setNewDate("");
      setNewStatus("Pending");
      toast.success("Order added successfully!");
    } catch (error) {
      toast.error("Failed to add order.");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`https://localhost:7080/api/SalesOrders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSalesData(salesData.filter((order) => order.id !== orderId));
      toast.success("Order deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete order.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-400 text-white p-8 pt-16">
      <h1 className="text-3xl font-bold mb-6">Sales Orders</h1>

      <form onSubmit={handleAddOrder} className="mb-6 bg-gray-700 p-4 rounded space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="number"
            min="0"
            placeholder="Price"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            className="w-full md:w-1/4 p-2 rounded bg-gray-600 text-white border border-gray-600"
          />
          <input
            type="datetime-local"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="w-full md:w-1/3 p-2 rounded bg-gray-600 text-white border border-gray-600"
          />
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="w-full md:w-1/4 p-2 rounded bg-gray-600 text-white border border-gray-600"
          >
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Delivered">Delivered</option>
          </select>
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded text-white font-semibold"
          >
            Add Order
          </button>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-600 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-left text-sm uppercase tracking-wider">
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Order Date</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((order) => (
              <tr key={order.id} className="border-t border-gray-700 hover:bg-gray-700 transition">
                <td className="px-6 py-4">{order.id}</td>
                <td className="px-6 py-4">{new Date(order.orderDate).toLocaleString()}</td>
                <td className="px-6 py-4"> ${order.price !== undefined ? order.price.toFixed(2) : "-"}</td>
                <td className="px-6 py-4">{order.status}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDeleteOrder(order.id)}
                    className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SalesOrders;