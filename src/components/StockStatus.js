import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StockStatus = () => {
    const [stockData, setStockData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [searchTerm, setSearchTerm] = useState('');
    const [hideZeroStock, setHideZeroStock] = useState(false);
    const token = localStorage.getItem("token");
    console.log("Stored token:", localStorage.getItem("token"));


useEffect(() => {
  const rawToken = localStorage.getItem('token');
  if (!rawToken) {
    console.error("No token found.");
    return;
  }

  const token = rawToken.trim(); // 🔧 ÖNEMLİ: Fazla boşluk varsa temizler

  console.log("Stored token:", token);

  axios.get('https://localhost:7080/api/Product/stock-status', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(response => {
    setStockData(response.data);
  })
  .catch(error => {
    console.error('Error fetching stock status:', error);
  });
}, []);



    const filteredData = stockData
        .filter(item =>
            item.productName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(item => hideZeroStock ? item.currentQuantity > 0 : true);

    const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));

    return (
        <div className="min-h-screen bg-gray-400 text-white p-8 pt-16">
            <h1 className="text-3xl font-bold mb-6">Stock Status</h1>

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
                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={hideZeroStock}
                        onChange={() => {
                            setHideZeroStock(!hideZeroStock);
                            setCurrentPage(1);
                        }}
                        className="accent-green-600"
                    />
                    Hide products with 0 stock
                </label>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-600 rounded-lg overflow-hidden">
                    <thead className="bg-gray-700 text-left text-sm uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-3">Product Name</th>
                            <th className="px-6 py-3">Warehouse</th>
                            <th className="px-6 py-3">Current Quantity</th>
                            <th className="px-6 py-3">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData
                            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                            .map((item, index) => (
                                <tr key={index} className="border-t border-gray-600 hover:bg-gray-700 transition">
                                    <td className="px-6 py-4">{item.productName}</td>
                                    <td className="px-6 py-4">{item.warehouseName}</td>
                                    <td className="px-6 py-4">{item.currentQuantity}</td>
                                    <td className="px-6 py-4">{new Date(item.date).toLocaleString()}</td>
                                </tr>
                            ))
                        }
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

export default StockStatus;
