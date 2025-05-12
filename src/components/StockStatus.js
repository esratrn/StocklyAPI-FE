import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StockStatus = () => {
    const [stockData, setStockData] = useState([]);

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
            </div>
        </div>
    );
};

export default StockStatus;
