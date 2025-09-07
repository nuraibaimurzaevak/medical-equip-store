import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // стили отдельно

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/')}>
        BioMedica
      </div>

      <div className="navbar-links">
        {user ? (
          <>
            <span className="navbar-user">Привет, {user.name}</span>
            <button onClick={() => navigate('/')} className="navbar-btn">
              Главная
            </button>
            <button onClick={() => navigate('/catalog')} className="navbar-btn">
              Каталог
            </button>
            <button onClick={() => navigate('/profile')} className="navbar-btn">
              О нас
            </button>
            <button onClick={() => navigate('/profile')} className="navbar-btn">
              Контакты
            </button>
            <button onClick={() => navigate('/profile')} className="navbar-btn">
              Профиль
            </button>
            {user.role === 'admin' && (
              <button onClick={() => navigate('/admin')} className="navbar-btn">
                Админка
              </button>
            )}
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')} className="navbar-btn">
              Войти
            </button>
            <button onClick={() => navigate('/register')} className="navbar-btn">
              Регистрация
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
