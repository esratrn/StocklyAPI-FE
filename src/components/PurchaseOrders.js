import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PurchaseOrders = () => {
  const [purchaseData, setPurchaseData] = useState([]);
  const [newSupplierId, setNewSupplierId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [newStatus, setNewStatus] = useState("Pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editedStatus, setEditedStatus] = useState("Pending");
  const [showForm, setShowForm] = useState(false);
  const itemsPerPage = 5;

  const [productId, setProductId] = useState("");
  const [warehouseId, setWarehouseId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const token = localStorage.getItem("token");

  const fetchPurchaseOrders = async () => {
    try {
      const response = await axios.get("https://localhost:7080/api/PurchaseOrders");
      const sorted = response.data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    setPurchaseData(sorted);
   
    } catch (error) {
      console.error("Error fetching purchase orders:", error);
      toast.error("Failed to load purchase orders ❌");
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://localhost:7080/api/Product/all", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Product fetch failed: ", error);
      toast.error("Failed to load products ❌");
    }
  };

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get("https://localhost:7080/api/Warehouse/all", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWarehouses(response.data);
    } catch (error) {
      toast.error("Failed to fetch warehouses ❌");
    }
  };

  useEffect(() => {
    fetchPurchaseOrders();
    fetchProducts();
    fetchWarehouses();
  }, []);

  const handleAddOrder = async (e) => {
    e.preventDefault();
    const supplierIdValue = parseInt(newSupplierId);
    if (isNaN(supplierIdValue) || supplierIdValue < 0 || !productId || !warehouseId || !quantity) {
  toast.error("Please fill in all fields.");
  return;
}


    try {
      await axios.post("https://localhost:7080/api/PurchaseOrders", {
  supplierId: supplierIdValue,
  status: newStatus,
  productId: parseInt(productId),
  warehouseId: parseInt(warehouseId),
  quantity: parseInt(quantity)
}, {
  headers: { Authorization: `Bearer ${token}` }
});


      toast.success("Purchase order added!");
      fetchPurchaseOrders();
      setCurrentPage(1);
      setNewSupplierId("");
      setNewStatus("Pending");
      setProductId("");
      setWarehouseId("");
      setQuantity("");
      setShowForm(false);
    } catch (error) {
      console.error("Error adding purchase order:", error);
      toast.error("Failed to add purchase order ❌");
    }
  };

  const handleSaveStatus = async (orderId) => {
    try {
      const orderToUpdate = purchaseData.find((o) => o.id === orderId);
      await axios.put(`https://localhost:7080/api/PurchaseOrders/${orderId}`, {
        supplierId: orderToUpdate.supplierId,
        orderDate: orderToUpdate.orderDate,
        price: orderToUpdate.price,
        status: editedStatus,
      });
      toast.success("Status updated!");
      setEditingOrderId(null);
      fetchPurchaseOrders();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status ❌");
    }
  };

  const sortedData = [...purchaseData].sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

  const filteredData = sortedData.filter(
    (order) =>
      (statusFilter === "All" || order.status === statusFilter) &&
      order.id.toString().includes(searchTerm.trim())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen w-full bg-gray-400 text-white p-8 pt-16">
      <div className="flex justify-between items center mb-6">
      <h1 className="text-3xl font-bold">Purchase Orders</h1>
      

      
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded text-white font-semibold"
        >
          + Add Purchase Order
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by order ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 p-2 rounded bg-gray-600 text-white border border-gray-600"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full md:w-1/2 p-2 rounded bg-gray-600 text-white border border-gray-600"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-600 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-left text-sm uppercase tracking-wider">
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Supplier ID</th>
              <th className="px-6 py-3">Order Date</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Edit</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((order) => (
              <tr key={order.id} className="border-t border-gray-600 hover:bg-gray-700 transition">
                <td className="px-6 py-4">PO{String(order.id).padStart(4, "0")}</td>
                <td className="px-6 py-4">{order.supplierId}</td>
                <td className="px-6 py-4">
                  {new Date(order.orderDate).toLocaleString("en-US", {
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
                <td className="px-6 py-4">
                  {editingOrderId === order.id ? (
                    <div className="flex gap-2">
                      <select
                        value={editedStatus}
                        onChange={(e) => setEditedStatus(e.target.value)}
                        className="p-1 rounded bg-gray-600 text-white border border-gray-600"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      <button
                        onClick={() => handleSaveStatus(order.id)}
                        className="bg-blue-600 px-2 py-1 rounded text-xs"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingOrderId(null)}
                        className="bg-gray-500 px-2 py-1 rounded text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingOrderId(order.id);
                        setEditedStatus(order.status);
                      }}
                      className="text-blue-300 flex items-center gap-1"
                    >
                      ✏ Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="bg-green-700 text-white px-4 py-2 rounded disabled:opacity-40"
        >
          ← Previous
        </button>
        <span className="px-4 py-2 text-sm">Page {currentPage} of {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="bg-green-700 text-white px-4 py-2 rounded disabled:opacity-40"
        >
          Next →
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-4xl">
            <h2 className="text-xl font-semibold mb-4 text-white">Add Purchase Order</h2>
            <form onSubmit={handleAddOrder} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <input
                  type="number"
                  placeholder="Supplier ID"
                  min="0"
                  value={newSupplierId}
                  onChange={(e) => setNewSupplierId(e.target.value)}
                  className="p-2 rounded bg-gray-600 text-white border border-gray-600"
                />
                
              
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="p-2 rounded bg-gray-600 text-white border border-gray-600"
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <select
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  className="p-2 rounded bg-gray-600 text-white border border-gray-600"
                >
                  <option value="">Select Product</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.productName}
                    </option>
                  ))}
                </select>
                <select
                  value={warehouseId}
                  onChange={(e) => setWarehouseId(e.target.value)}
                  className="p-2 rounded bg-gray-600 text-white border border-gray-600"
                >
                  <option value="">Select Warehouse</option>
                  {warehouses.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.warehouseName}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="p-2 rounded bg-gray-600 text-white border border-gray-600"
                />
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded text-white font-semibold"
                >
                  Add Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default PurchaseOrders;
