import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className={`${!hideNavbar ? 'pt-0' : ''}`}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sales-orders" element={<SalesOrders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/warehouses" element={<Warehouses />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stock-status" element={<StockStatus />} />
          <Route path="/purchase-orders" element={<PurchaseOrders />} />
          <Route path="/suppliers" element={<Suppliers />} />
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
