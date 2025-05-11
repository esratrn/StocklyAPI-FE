import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Warehouses = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [formData, setFormData] = useState({
    warehouse_name: "",
    location: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const token = localStorage.getItem("token");

  // GET
  useEffect(() => {
    axios
      .get("https://localhost:7080/api/warehouses", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const mapped = res.data.map((item) => ({
          id: item.id,
          warehouse_name: item.warehouseName,
          location: item.location,
        }));
        setWarehouses(mapped);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        toast.error("Failed to load warehouses");
      });
  }, []);

  const handleEdit = (wh) => {
    setFormData({
      warehouse_name: wh.warehouse_name,
      location: wh.location,
    });
    setEditingId(wh.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this warehouse?")) {
      try {
        await axios.delete(`https://localhost:7080/api/warehouses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWarehouses((prev) => prev.filter((w) => w.id !== id));
        toast.success("Warehouse deleted 🗑");
      } catch {
        toast.error("Delete failed ❌");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { warehouse_name, location } = formData;

    if (!warehouse_name || !location) {
      toast.error("Please fill in all fields ❌");
      return;
    }

    try {
      if (editingId) {
        await axios.put(
          `https://localhost:7080/api/warehouses/${editingId}`,
          { warehouseName: warehouse_name, location },

          { headers: { Authorization: `Bearer ${token}` } }
        );
        const updated = warehouses.map((w) =>
          w.id === editingId ? { ...w, ...formData } : w
        );
        setWarehouses(updated);
        toast.success("Warehouse updated ✅");
      } else {
        const res = await axios.post(
          "https://localhost:7080/api/warehouses",
         { warehouseName: warehouse_name, location },

          { headers: { Authorization: `Bearer ${token}` } }
        );
        setWarehouses([...warehouses, res.data]);
        toast.success("New warehouse added 🎉");
      }
    } catch {
      toast.error("Save failed 😓");
    }

    setFormData({ warehouse_name: "", location: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const filtered = warehouses.filter((w) =>
    (w?.warehouse_name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-400 text-white p-8 pt-16">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Warehouses</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({ warehouse_name: "", location: "" });
          }}
          className={`${
            showForm
              ? "bg-green-600 hover:bg-red-700"
              : "bg-green-700 hover:bg-green-600"
          } text-white font-semibold py-2 px-4 rounded`}
        >
          {showForm ? "✖ Close Form" : "+ Add Warehouse"}
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 mb-4 w-full md:w-1/2 rounded bg-gray-600 text-white border border-gray-600"
      />

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded mb-8 grid grid-cols-1 gap-4"
        >
          <input
            type="text"
            placeholder="Warehouse Name"
            value={formData.warehouse_name}
            onChange={(e) =>
              setFormData({ ...formData, warehouse_name: e.target.value })
            }
            className="p-2 rounded bg-gray-700 text-white"
          />
          <textarea
            placeholder="Location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="p-2 rounded bg-gray-700 text-white resize-y"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            {editingId ? "Update" : "Submit"}
          </button>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-600 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-left text-sm uppercase tracking-wider">
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Warehouse Name</th>
              <th className="px-6 py-3">Location</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((w) => (
              <tr
                key={w.id}
                className="border-t border-gray-700 hover:bg-gray-700 transition"
              >
                <td className="px-6 py-4">
                  WH{String(w.id).padStart(4, "0")}
                </td>
                <td className="px-6 py-4">{w.warehouse_name}</td>
                <td className="px-6 py-4">{w.location}</td>
                <td className="px-6 py-4 flex gap-4">
                  <button
                    onClick={() => handleEdit(w)}
                    className="text-blue-400 hover:text-blue-600 font-semibold"
                  >
                    🖊 Edit
                  </button>
                  <button
                    onClick={() => handleDelete(w.id)}
                    className="text-red-400 hover:text-red-600 font-semibold"
                  >
                    🗑 Delete
                  </button>
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

export default Warehouses;
