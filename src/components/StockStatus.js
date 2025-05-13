import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StockStatus = () => {
    const [stockData, setStockData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;
const totalPages = Math.ceil(stockData.length / itemsPerPage);



    useEffect(() => {
        axios.get('https://localhost:7080/api/Product/stock-status', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            setStockData(response.data);
        })
        .catch(error => {
            console.error('Error fetching stock status:', error);
        });
    }, []);

    return (
        <div className="min-h-screen bg-gray-400 text-white p-8 pt-16">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold">Stock Status</h1>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-600 rounded-lg overflow-hidden">
                    <thead className="bg-gray-700 text-left text-sm uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-3">Product Name</th>
                            <th className="px-6 py-3">Warehouse ID</th>
                            <th className="px-6 py-3">Current Quantity</th>
                            <th className="px-6 py-3">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockData.map((item, index) => (
                            <tr key={index} className="border-t border-gray-600 hover:bg-gray-700 transition">
                                <td className="px-6 py-4">{item.productName}</td>
                                <td className="px-6 py-4">{item.warehouseId}</td>
                                <td className="px-6 py-4">{item.currentQuantity}</td>
                                <td className="px-6 py-4">{new Date(item.date).toLocaleString()}</td>
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

export default StockStatus;
