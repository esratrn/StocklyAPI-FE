import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SalesOrders = () => {
  const [salesData, setSalesData] = useState([]);
  const [newDate, setNewDate] = useState("");
  const [newStatus, setNewStatus] = useState("Pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [editingStatus, setEditingStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const token = localStorage.getItem("token");
  const [productId, setProductId] = useState("");
  const [warehouseId, setWarehouseId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newPrice, setNewPrice] = useState("");


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

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://localhost:7080/api/Product/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (error) {
      toast.error("Failed to fetch products.");
    }
  };

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get("https://localhost:7080/api/Warehouse/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWarehouses(response.data);
    } catch (error) {
      toast.error("Failed to fetch warehouses ❌");
    }
  };

  useEffect(() => {
    fetchSalesOrders();
    fetchProducts();
    fetchWarehouses();
  }, []);
  useEffect(() => {
  if (productId && quantity) {
    const selectedProduct = products.find(p => p.id === parseInt(productId));
    if (selectedProduct) {
      const total = selectedProduct.price * parseInt(quantity || 0);
      setNewPrice(total.toFixed(2)); // otomatik fiyat yazdır
    } else {
      setNewPrice("");
    }
  } 
}, [productId, quantity, products]);

 const handleAddOrder = async (e) => {
  e.preventDefault();
 if (!productId || !warehouseId || !quantity) {
  toast.error("Please fill in all fields.");
  return;
}


  
  try {
    const response = await axios.post(
      "https://localhost:7080/api/SalesOrders",
      {
        userId: 1,
        
  status: newStatus,
  productId: parseInt(productId),
  warehouseId: parseInt(warehouseId),
  quantity: parseInt(quantity),
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setSalesData([response.data, ...salesData]);
    setNewPrice("");
    setNewStatus("Pending");
    setProductId("");
    setWarehouseId("");
    setQuantity("");
    setShowForm(false);
    toast.success("Order added successfully!");
  } catch (error) {
    toast.error("Failed to add order.");
  }
};

  const handleEditOrder = (orderId) => {
    const orderToEdit = salesData.find((o) => o.id === orderId);
    setEditingId(orderId);
    setEditingStatus(orderToEdit.status);
  };

  const handleSaveStatus = async (orderId) => {
    const orderToEdit = salesData.find((o) => o.id === orderId);
    try {
      await axios.put(
        `https://localhost:7080/api/SalesOrders/${orderId}`,
        {
          id: orderId,
          userId: orderToEdit.userId,
          orderDate: orderToEdit.orderDate,
          status: editingStatus,
          price: orderToEdit.price,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Status updated!");
      fetchSalesOrders();
      setEditingId(null);
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  const filteredOrders = salesData.filter(
    (order) =>
      order.id.toString().includes(searchQuery) &&
      (statusFilter === "All" || order.status === statusFilter)
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-400 text-white p-8 pt-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Sales Orders</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded text-white font-semibold"
        >
          + Add Sales Order
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
          <option value="Shipped">Shipped</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

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
            {paginatedData.map((order) => (
              <tr key={order.id} className="border-t border-gray-700 hover:bg-gray-700 transition">
                <td className="px-6 py-4">{order.id}</td>
                <td className="px-6 py-4">{new Date(order.orderDate).toLocaleString()}</td>
                <td className="px-6 py-4">${order.price.toFixed(2)}</td>
                <td className="px-6 py-4">
                  {editingId === order.id ? (
                    <select
                      value={editingStatus}
                      onChange={(e) => setEditingStatus(e.target.value)}
                      className="p-1 rounded bg-gray-600 text-white"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === "Cancelled" ? "bg-red-500" :
                      order.status === "Pending" ? "bg-yellow-500" :
                      order.status === "Shipped" ? "bg-green-500" :
                      order.status === "Delivered" ? "bg-blue-500" : "bg-gray-500"
                    }`}>
                      {order.status}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 space-x-2">
                  {editingId === order.id ? (
                    <div className="flex gap-2">
                      <button onClick={() => handleSaveStatus(order.id)} className="bg-blue-600 hover:bg-blue-500 px-2 py-1 rounded text-xs">Save</button>
                      <button onClick={() => setEditingId(null)} className="bg-gray-500 hover:bg-gray-400 px-2 py-1 rounded text-xs">Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => handleEditOrder(order.id)} className="text-blue-300 flex items-center gap-1">✏ Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="bg-green-700 text-white px-4 py-2 rounded disabled:opacity-40">← Previous</button>
        <span className="px-4 py-2 text-sm">Page {currentPage} of {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="bg-green-700 text-white px-4 py-2 rounded disabled:opacity-40">Next →</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-4xl">
            <h2 className="text-xl font-semibold mb-4 text-white">Add Sales Order</h2>
            <form onSubmit={handleAddOrder} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               

               
                <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="p-2 rounded bg-gray-600 text-white border border-gray-600">
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <select value={productId} onChange={(e) => setProductId(e.target.value)} className="p-2 rounded bg-gray-600 text-white border border-gray-600">
                  <option value="">Select Product</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>{p.productName}</option>
                  ))}
                </select>
                <select value={warehouseId} onChange={(e) => setWarehouseId(e.target.value)} className="p-2 rounded bg-gray-600 text-white border border-gray-600">
                  <option value="">Select Warehouse</option>
                  {warehouses.map((w) => (
                    <option key={w.id} value={w.id}>{w.warehouseName}</option>
                  ))}
                </select>
                <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="p-2 rounded bg-gray-600 text-white border border-gray-600" />
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <button type="button" onClick={() => setShowForm(false)} className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                <button type="submit" className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded text-white font-semibold">Add Order</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SalesOrders;
