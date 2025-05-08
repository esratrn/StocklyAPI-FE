import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PurchaseOrders = () => {
  const [purchaseData, setPurchaseData] = useState([
    {
      id: 1,
      supplier_id: 1,
      order_date: "2024-06-18T11:25:40Z",
      status: "Completed",
    },
    {
      id: 2,
      supplier_id: 2,
      order_date: "2024-06-20T14:10:05Z",
      status: "Pending",
    },
    {
      id: 3,
      supplier_id: 3,
      order_date: "2024-06-22T16:45:55Z",
      status: "Cancelled",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const sortedData = [...purchaseData].sort(
    (a, b) => new Date(b.order_date) - new Date(a.order_date)
  );

  const filteredData = sortedData.filter(
    (order) =>
      order.supplier_id.toString().includes(searchTerm.trim()) &&
      (statusFilter === "All" || order.status === statusFilter)
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white p-8 pt-16">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Purchase Orders</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by supplier ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white border border-gray-600 w-full md:w-1/2"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white border border-gray-600 w-full md:w-1/4"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-left text-sm uppercase tracking-wider">
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Supplier ID</th>
              <th className="px-6 py-3">Order Date</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((order) => (
              <tr
                key={order.id}
                className="border-t border-gray-700 hover:bg-gray-600 transition"
              >
                <td className="px-6 py-4">PO{String(order.id).padStart(4, "0")}</td>
                <td className="px-6 py-4">{order.supplier_id}</td>
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
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === "Completed"
                        ? "bg-green-500"
                        : order.status === "Cancelled"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {order.status}
                  </span>
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
          className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-40"
        >
          ← Previous
        </button>
        <span className="px-4 py-2 text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-40"
        >
          Next →
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default PurchaseOrders;