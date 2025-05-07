import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StockStatus() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 pt-24">
      <h2 className="text-xl font-bold mb-4">Stock Status</h2>
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border">#</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Category</th>
            <th className="py-2 px-4 border">Quantity</th>
            <th className="py-2 px-4 border">Price (₺)</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={p.id} className="text-center">
              <td className="py-2 px-4 border">{i + 1}</td>
              <td className="py-2 px-4 border">{p.name}</td>
              <td className="py-2 px-4 border">{p.category}</td>
              <td className="py-2 px-4 border">{p.quantity}</td>
              <td className="py-2 px-4 border">{p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockStatus;
