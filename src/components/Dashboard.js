import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

let chartInstance = null; // dışarıda tanımla

function Dashboard() {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // daha önce varsa yok et
    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
          label: 'Stock Entries',
          data: [12, 19, 3, 5, 2, 3, 7],
          borderColor: '#BE123C',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }, []);

  return (
    <div className="bg-gray-400 min-h-screen text-white p-6 pt-16">
      <h1 className="text-3xl font-semibold text-white mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Kartlar */}
        {/* Kartlar */}
<div className="bg-gray-500 p-6 rounded shadow">
  <p className="text-base font-semibold text-purple-700">Total Stocks</p>
  <p className="text-4xl font-bold mt-2 text-purple-700">7</p>
</div>
<div className="bg-gray-500 p-6 rounded shadow">
  <p className="text-base font-semibold text-purple-700">Total History</p>
  <p className="text-4xl font-bold mt-2 text-purple-700">3</p>
</div>
<div className="bg-gray-500 p-6 rounded shadow">
  <p className="text-base font-semibold text-purple-700">Total Categories</p>
  <p className="text-4xl font-bold mt-2 text-purple-700">3</p>
</div>
<div className="bg-gray-500 p-6 rounded shadow">
  <p className="text-base font-semibold text-purple-700">Today's Visitors</p>
  <p className="text-4xl font-bold mt-2 text-purple-700">1</p>
</div>

      </div>

      {/* Grafik */}
      <div className="bg-gray-300 p-6 rounded shadow">
        <h2 className="text-xl font-semibold text-black mb-4">Weekly Stock Report</h2>
        <canvas ref={chartRef} height="100"></canvas>
      </div>
    </div>
  );
}

export default Dashboard;
