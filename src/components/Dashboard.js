import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import API from "../services/api";

let chartInstance = null;

function Dashboard() {
  const chartRef = useRef(null);
  const [weeklyReport, setWeeklyReport] = useState([]);
  const [stats, setStats] = useState({
    totalStocks: 0,
    totalCategories: 0,
    totalHistory: 0,
    todaysVisitors: 0,
  });

  useEffect(() => {
    API.get("/api/dashboard")
    .then(res => {
      setWeeklyReport(res.data.weeklyReport || []);
      setStats({
        totalStocks: res.data.totalStocks,
        totalCategories: res.data.totalCategories,
        totalHistory: res.data.totalHistory,
        todaysVisitors: res.data.todaysVisitors
      });
    })
    .catch(err => {
      console.error("API error:", err);
    });
  }, []);

  useEffect(() => {
    if (!chartRef.current || weeklyReport.length === 0) return;

    const ctx = chartRef.current.getContext('2d');

    const orderedDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const dayToCount = {};
    weeklyReport.forEach(item => {
      dayToCount[item.day] = item.count;
    });

    const chartData = orderedDays.map(day => dayToCount[day] || 0);

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: orderedDays,
        datasets: [{
          label: 'Stock Entries',
          data: chartData,
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
  }, [weeklyReport]);

  return (
    <div className="bg-gray-400 min-h-screen text-white p-6 pt-16">
      <h1 className="text-3xl font-semibold text-white mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-gray-500 p-6 rounded shadow">
          <p className="text-base font-semibold text-white">Total Stocks</p>
          <p className="text-4xl font-bold mt-2 text-white">{stats.totalStocks}</p>
        </div>
        <div className="bg-gray-500 p-6 rounded shadow">
          <p className="text-base font-semibold text-white">Total History</p>
          <p className="text-4xl font-bold mt-2 text-white">{stats.totalHistory}</p>
        </div>
        <div className="bg-gray-500 p-6 rounded shadow">
          <p className="text-base font-semibold text-white">Total Categories</p>
          <p className="text-4xl font-bold mt-2 text-white">{stats.totalCategories}</p>
        </div>
        <div className="bg-gray-500 p-6 rounded shadow">
          <p className="text-base font-semibold text-white">Today's Visitors</p>
          <p className="text-4xl font-bold mt-2 text-white">{stats.todaysVisitors}</p>
        </div>
      </div>

      <div className="bg-gray-300 p-6 rounded shadow">
        <h2 className="text-xl font-semibold text-black mb-4">Weekly Stock Report</h2>
        <canvas ref={chartRef} height="100"></canvas>
      </div>
    </div>
  );
}

export default Dashboard;
