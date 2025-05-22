import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API from '../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState('');
  const token = localStorage.getItem("token");

  useEffect(() => {
    const rawToken = localStorage.getItem('token');
    if (!rawToken) {
      console.error("No token found.");
      return;
    }

    const token = rawToken.trim();
    API.get("/api/Poduct/with-category")
})
.then(response => {
  setProducts(response.data);
})
.catch(error => {
  console.error('Error fetching products:', error);
});


  const filteredData = products.filter(item =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));

  return (
    <div className="min-h-screen bg-gray-400 text-white p-8 pt-16">
      <h1 className="text-3xl font-bold mb-6">Product List</h1>

      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 text-black bg-gray-600 border-gray-600 rounded w-full md:w-1/3"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-600 rounded-lg overflow-hidden">
          <thead className="bg-gray-700 text-left text-sm uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">Product Name</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredData
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((item, index) => (
                <tr key={index} className="border-t border-gray-600 hover:bg-gray-700 transition">
                  <td className="px-6 py-4">{item.productName}</td>
                  <td className="px-6 py-4">{item.categoryName}</td>
                  <td className="px-6 py-4">₺{item.price}</td>
                </tr>
              ))}
          </tbody>
        </table>

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
      </div>
    </div>
  );
};

export default ProductList;
