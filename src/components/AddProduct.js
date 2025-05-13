import React, { useState } from 'react';
import axios from 'axios';

function AddProduct() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [warehouseid, setWarehouseid] = useState('');


  const handleSubmit = async (e) => {
  e.preventDefault();

  const normalizedCategory = category.trim().toLowerCase();
  let categoryId = 0;
  if (normalizedCategory === "electronics") {
    categoryId = 1;
  } else if (normalizedCategory === "office supplies") {
    categoryId = 2;
  } else if (normalizedCategory === "books") {
    categoryId = 3;
  } else {
    alert("Unknown category: " + category);
  }

  const product = {
    productName: name,
    categoryId: categoryId,
    stockQuantity: parseInt(quantity),
    price: parseFloat(price),
    warehouseId: parseInt(warehouseid), // ✅ EKLENDİ
    description: "optional desc"
  };

  try {
    const token = localStorage.getItem('token');
    await axios.post(
      "https://localhost:7080/api/Product",
      product,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    );
    alert('Product added!');
  } catch (error) {
    console.error(error);
    alert('Failed to add product.');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400">
      <div className="p-8 space-y-6 w-full max-w-md ml-0 border bg-gray-50 border-gray-300 rounded-lg shadow-md">
        <h1 className="font-medium text-3xl">Add Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm text-gray-700 block mb-1 font-medium">Product Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label htmlFor="quantity" className="text-sm text-gray-700 block mb-1 font-medium">Quantity</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-1 bg-gray-100 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="0"
              min="0"
              required
            />
          </div>
          <div>
            <label htmlFor="warehouse" className="text-sm text-gray-700 block mb-1 font-medium">Warehouse Id</label>
            <input
              type="number"
              name="warehouseid"
              id="warehouse"
              value={warehouseid}
              onChange={(e) => setWarehouseid(e.target.value)}
              className="w-full px-3 py-1 bg-gray-100 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="0"
              min="0"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="$0.00"
              min="0"
              step="0.01"
              className="w-full px-3 py-1 bg-gray-100 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="w-full md:w-2/5">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className={`block w-96 rounded border border-gray-200 px-3 py-1 bg-gray-100 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 ${
                category === '' ? 'text-gray-400' : 'text-gray-700'
              }`}
            >
              <option value="" className="text-gray-400" disabled>Choose...</option>
              <option value="electronics">Electronics</option>
              <option value="office supplies">Office Suppliers</option>
              <option value="books">Books</option>
            </select>
          </div>

          <button
            type="submit"
            className="text-white py-2 px-4 uppercase rounded bg-green-700 hover:bg-green-700 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
