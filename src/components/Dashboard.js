import React from 'react';

function Dashboard() {
  return (
    <div style={{ backgroundColor: '#F5F5F4' }}className="min-h-screen text-white p-6 pt-16">
        <div className="flex justify-start mb-6">
    <h1 className="text-3xl font-semibold text-black">Dashboard</h1>
  </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded shadow">
          <p className="text-sm font-medium">Total Stocks</p>
          <p className="text-3xl font-semibold mt-2">7</p>
        </div>
        <div className="bg-gray-800 p-6 rounded shadow">
          <p className="text-sm font-medium">Total History</p>
          <p className="text-3xl font-semibold mt-2">3</p>
        </div>
        <div className="bg-gray-800 p-6 rounded shadow">
          <p className="text-sm font-medium">Total Categories</p>
          <p className="text-3xl font-semibold mt-2">3</p>
        </div>
        <div className="bg-gray-800 p-6 rounded shadow">
          <p className="text-sm font-medium">Today's Visitors</p>
          <p className="text-3xl font-semibold mt-2">1</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

  