import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar/index.js';
import Login from './pages/auth/Login/index.js';
import Register from './pages/auth/Register/index.js';
import Home from './pages/user/Home/index.js';
import ProductList from './pages/user/ProductList/index.js';
import OrderForm from './pages/user/OrderForm/index.js';
import OrderTracking from './pages/user/OrderTracking/index.js';
import AdminDashboard from './pages/admin/AdminDashboard/index.js';
import ProductManager from './pages/admin/ProductManager/index.js';
import OrderManager from './pages/admin/OrderManager/index.js';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import OrderSearchForm from './components/OrderSearchForm/index.js'; 

import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <AuthProvider>
      <Router>
        <AppNavbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/user" element={<PrivateRoute role="user"><Home /></PrivateRoute>} />
          <Route path="/user/products" element={<PrivateRoute role="user"><ProductList /></PrivateRoute>} />
          <Route path="/user/order" element={<PrivateRoute role="user"><OrderForm /></PrivateRoute>} />
          <Route path="/user/orders" element={<PrivateRoute role="user"><OrderSearchForm /></PrivateRoute>} /> 
          <Route path="/user/orders/:orderId" element={<PrivateRoute role="user"><OrderTracking /></PrivateRoute>} /> 

         
          <Route path="/admin" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/products" element={<PrivateRoute role="admin"><ProductManager /></PrivateRoute>} />
          <Route path="/admin/orders" element={<PrivateRoute role="admin"><OrderManager /></PrivateRoute>} />

       
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
