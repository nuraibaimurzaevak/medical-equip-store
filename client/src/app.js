// src/App.js
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';


import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import AdminPanel from './pages/AdminPanel';
import ManageCategories from './pages/admin/ManageCategories';
import CatalogPage from './pages/CatalogPage';
import ManageProducts from './pages/admin/ManageProducts';
import ManageUsers from './pages/admin/ManageUsers';
import ManageManufacturers from './pages/admin/ManageManufacturers';
import ManageOrders from './pages/admin/ManageOrders';


const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route path="/login" element={<LoginForm onLogin={setUser} />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/admin/categories" element={<ManageCategories />} />
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/admin/products" element={<ManageProducts />} />
      <Route path="/admin/users" element={<ManageUsers />} />
      <Route path="/admin/manufacturers" element={<ManageManufacturers />} />
      <Route path="/admin/orders" element={<ManageOrders/>} />
    </Routes>
  );
};

export default App;
