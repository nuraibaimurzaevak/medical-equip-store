import React from 'react';
import Navbar from '../components/navbar';
import '../styles/Admin.css';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="admin-panel-container">
        <h1>Админ-панель</h1>

        <nav className="admin-menu">
          <button onClick={() => navigate('/admin/categories')} className="admin-menu-btn">
            Управление категориями
          </button>
          <button onClick={() => navigate('/admin/users')} className="admin-menu-btn">
            Управление пользователями
          </button>
          <button onClick={() => navigate('/admin/products')} className="admin-menu-btn">
            Управление продуктами
          </button>
          <button onClick={() => navigate('/admin/manufacturers')} className="admin-menu-btn">
            Управление производителями
          </button>
          <button onClick={() => navigate('/admin/orders')} className="admin-menu-btn">
            Управление заказами
          </button>
          <button onClick={() => navigate('/admin/warehouse')} className="admin-menu-btn">
            Управление складом
          </button>
        </nav>

        <div className="admin-report">
          <button onClick={() => navigate('/admin/reports')} className="admin-report-btn">
            Отчет
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
