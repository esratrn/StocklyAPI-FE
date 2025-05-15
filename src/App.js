import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios'; // ✅ Ekledik
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import AddProduct from './components/AddProduct';
import Dashboard from './components/Dashboard';
import SalesOrders from './components/SalesOrders';
import StockStatus from './components/StockStatus';
import PurchaseOrders from './components/PurchaseOrders';
import Warehouses from './components/Warehouses';
import Suppliers from './components/Suppliers';
import Notifications from './components/Notifications';
import UserProfile from './components/UserProfile';

// ✅ Token'ı global olarak axios'a tanıt
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token.trim()}`;
}

function AppContent() {
  const location = useLocation();
  const currentPath = location.pathname;
  const hideNavbar = currentPath === '/login' || currentPath === '/register' || currentPath === '/';

  return (
    <>
       {!hideNavbar && <Navbar />}
       <div className={`${!hideNavbar ? 'pt-0' : ''}`}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sales-orders" element={<SalesOrders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/warehouses" element={<Warehouses />} />
          <Route path="/stock-status" element={<StockStatus />} />
          <Route path="/purchase-orders" element={<PurchaseOrders />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/userprofile" element={<UserProfile />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

