import React, { useMemo, useState } from 'react';

const StockStatus = () => {
  const products = [
    { id: 1, product_name: "Logitech MX Master 3S Mouse" },
    { id: 2, product_name: "Dell Inspiron 15 Laptop" },
    { id: 3, product_name: "A4 Copy Paper - 500 Sheets" },
    { id: 4, product_name: "The Pragmatic Programmer Book" },
  ];

  const stockMovements = useMemo(() => [
    { product_id: 1, warehouse_id: 1, movement_type: "IN", quantity: 15, movement_date: "2025-03-15 09:00:00" },
    { product_id: 1, warehouse_id: 1, movement_type: "OUT", quantity: 5, movement_date: "2025-03-16 10:30:00" },
    { product_id: 2, warehouse_id: 1, movement_type: "IN", quantity: 30, movement_date: "2025-03-17 11:00:00" },
    { product_id: 2, warehouse_id: 2, movement_type: "OUT", quantity: 10, movement_date: "2025-03-18 14:15:00" },
    { product_id: 3, warehouse_id: 2, movement_type: "IN", quantity: 25, movement_date: "2025-03-20 09:45:00" },
    { product_id: 4, warehouse_id: 3, movement_type: "IN", quantity: 20, movement_date: "2025-03-23 14:20:00" },
    { product_id: 4, warehouse_id: 3, movement_type: "OUT", quantity: 2, movement_date: "2025-03-25 10:15:00" },
  ], []);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filtered = stockMovements.filter((item) => {
    const product = products.find(p => p.id === item.product_id);
    return product?.product_name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-16">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Stock Movements</h1>
      </div>

      <input
        type="text"
        placeholder="Search by product name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 mb-6 w-full md:w-1/2 rounded bg-gray-800 text-white border border-gray-600"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-left text-sm uppercase tracking-wider">
              <th className="px-6 py-3">Product Name</th>
              <th className="px-6 py-3">Warehouse ID</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3">Movement Type</th>
              <th className="px-6 py-3">Movement Date</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((item, index) => {
              const product = products.find(p => p.id === item.product_id);
              return (
                <tr key={index} className="border-t border-gray-700 hover:bg-gray-600 transition">
                  <td className="px-6 py-4">{product?.product_name || "Unknown"}</td>
                  <td className="px-6 py-4">{item.warehouse_id}</td>
                  <td className="px-6 py-4">{item.quantity}</td>
                  <td className="px-6 py-4 text-xs font-medium text-white text-center">
                    {item.movement_type}
                  </td>
                  <td className="px-6 py-4">{item.movement_date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

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
    </div>
  );
};

export default StockStatus;
