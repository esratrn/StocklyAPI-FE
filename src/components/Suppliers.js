import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState({
    supplier_name: "",
    contact_info: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const token = localStorage.getItem("token");

  
  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("https://localhost:7080/api/Suppliers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuppliers(response.data);
    } catch (error) {
      toast.error("Failed to fetch suppliers ❌");
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleEdit = (supplier) => {
    setFormData({
      supplier_name: supplier.supplierName,
      contact_info: supplier.contactInfo,
    });
    setEditingId(supplier.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this supplier?");
    if (confirmDelete) {
      try {
        await axios.delete(`https://localhost:7080/api/Suppliers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Supplier deleted 🗑");
        fetchSuppliers();
      } catch (error) {
        toast.error("Error deleting supplier ❌");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.supplier_name || !formData.contact_info) {
      toast.error("Please fill in all fields ❌");
      return;
    }

    const payload = {
      supplierName: formData.supplier_name,
      contactInfo: formData.contact_info,
    };

    try {
      if (editingId) {
        await axios.put(`https://localhost:7080/api/Suppliers/${editingId}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Supplier updated ✅");
      } else {
        await axios.post("https://localhost:7080/api/Suppliers", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("New supplier added 🎉");
      }

      setFormData({ supplier_name: "", contact_info: "" });
      setEditingId(null);
      setShowForm(false);
      fetchSuppliers();
    } catch (error) {
      toast.error("Error saving supplier ❌");
    }
  };

  const filtered = suppliers.filter((s) =>
    s.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-400 text-white p-8 pt-16">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Suppliers</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setFormData({ supplier_name: "", contact_info: "" });
            setEditingId(null);
          }}
          className="bg-green-700 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
        >
          {showForm ? "Close Form" : "+ Add Supplier"}
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
            placeholder="Supplier Name"
            value={formData.supplier_name}
            onChange={(e) =>
              setFormData({ ...formData, supplier_name: e.target.value })
            }
            className="p-2 rounded bg-gray-700 text-white"
          />
          <textarea
            placeholder="Contact Info (email | phone)"
            value={formData.contact_info}
            onChange={(e) =>
              setFormData({ ...formData, contact_info: e.target.value })
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
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Contact Info</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((s) => (
              <tr key={s.id} className="border-t border-gray-600 hover:bg-gray-700 transition">
                <td className="px-6 py-4">SUP{String(s.id).padStart(4, "0")}</td>
                <td className="px-6 py-4">{s.supplierName}</td>
                <td className="px-6 py-4">{s.contactInfo}</td>
                <td className="px-6 py-4 flex justify-center gap-4">
                  <button
                    onClick={() => handleEdit(s)}
                    className="text-blue-400 hover:text-blue-600 font-semibold"
                  >
                    🖊 Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
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

export default Suppliers;
