import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SalesOrders = () => {
  const [salesData, setSalesData] = useState([
    { id: 1, price: 299.99, order_date: "2025-03-25T12:00:00Z", status: "Cancelled" },
    { id: 2, price: 159.49, order_date: "2025-03-26T13:30:00Z", status: "Shipped" },
    { id: 3, price: 89.90, order_date: "2025-03-22T14:45:00Z", status: "Cancelled" },
    { id: 4, price: 499.00, order_date: "2025-03-28T12:30:00Z", status: "Delivered" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingStatusId, setEditingStatusId] = useState(null);
  const itemsPerPage = 5;

  const [newPrice, setNewPrice] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newStatus, setNewStatus] = useState("Pending");

  const updateStatusLocally = (orderId, newStatus) => {
    const updated = salesData.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setSalesData(updated);
    setEditingStatusId(null);
  };

  const handleAddOrder = (e) => {
    e.preventDefault();
    if (!newPrice || !newDate) {
      toast.error("Please fill in all fields.");
      return;
    }

    const newId = Math.max(...salesData.map((o) => o.id)) + 1;
    const newOrder = {
      id: newId,
      price: parseFloat(newPrice),
      order_date: newDate,
      status: newStatus,
    };

    setSalesData([newOrder, ...salesData]);
    setNewPrice("");
    setNewDate("");
    setNewStatus("Pending");
    toast.success("Order added successfully!");
  };

  const sortedSales = [...salesData].sort(
    (a, b) => new Date(b.order_date) - new Date(a.order_date)
  );

  const filteredSales = sortedSales
    .filter((order) => order.id.toString().includes(searchTerm.trim()))
    .filter((order) => statusFilter === "All" || order.status === statusFilter);

  const totalPages = Math.ceil(filteredSales.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSales = filteredSales.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-400 text-white p-8 pt-16">
      <h1 className="text-3xl font-bold mb-6">Sales Orders</h1>

      {/* Add Order Form */}
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

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by order ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 p-2 rounded bg-gray-600 text-white border border-gray-600"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full md:w-1/4 p-2 rounded bg-gray-600 text-white border border-gray-600"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-600 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-left text-sm uppercase tracking-wider">
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Order Date</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Edit</th>
            </tr>
          </thead>
          <tbody>
            {paginatedSales.map((order) => (
              <tr key={order.id} className="border-t border-gray-700 hover:bg-gray-700 transition">
                <td className="px-6 py-4">{order.id}</td>
                <td className="px-6 py-4">
                  {new Date(order.order_date).toLocaleString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                </td>
                <td className="px-6 py-4">${order.price.toFixed(2)}</td>
                <td className="px-6 py-4">
                  {editingStatusId === order.id ? (
                    <select
                      value={order.status}
                      onChange={(e) => updateStatusLocally(order.id, e.target.value)}
                      className="bg-gray-700 text-white rounded p-1"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Shipped"
                          ? "bg-green-500"
                          : order.status === "Cancelled"
                          ? "bg-red-500"
                          : order.status === "Delivered"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      setEditingStatusId(editingStatusId === order.id ? null : order.id)
                    }
                    className="text-blue-400 hover:text-blue-600 font-semibold"
                  >
                    ✏️ Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="bg-green-700 text-white px-4 py-2 rounded disabled:opacity-40"
        >
          ← Previous
        </button>
        <span className="px-4 py-2 text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="bg-green-700 text-white px-4 py-2 rounded disabled:opacity-40"
        >
          Next →
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SalesOrders;
