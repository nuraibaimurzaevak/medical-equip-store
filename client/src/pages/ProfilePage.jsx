import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import '../styles/Profile.css'; // стили из моего примера

const ProfilePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
    <Navbar />
    <div className="profile-container">
      <h2 className="profile-header">Добро пожаловать, {user.name}</h2>
      <div className="profile-main">
        <img
          className="avatar"
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          alt="avatar"
        />
        <div className="profile-info">
          <p><strong>Имя:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Роль:</strong> {user.role}</p>
        </div>
      </div>
      <div className="button-group">
        <button className="btn yellow" onClick={() => navigate('/change-password')}>
          Сменить пароль
        </button>
        <button className="btn blue" onClick={() => navigate('/edit-profile')}>
          Редактировать профиль
        </button>
        <button className="btn gray" onClick={handleLogout}>
          Выйти
        </button>
        {user.role === 'admin' && (
          <button className="btn admin" onClick={() => navigate('/admin')}>
            Админ-панель
          </button>
        )}
      </div>
    </div>
    </>
  );
};

export default ProfilePage;
