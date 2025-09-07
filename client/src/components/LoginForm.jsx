import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'; // обязательно подключаем стили

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage('Пожалуйста, заполните все поля');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // ✅ ОБЯЗАТЕЛЬНО для работы с httpOnly cookie
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setMessage('');
        alert('Login successful!');

        // ✅ сохраняем пользователя в state (если нужно выше)
        onLogin(data.user);

        // ✅ сохраняем пользователя в localStorage
        localStorage.setItem('user', JSON.stringify(data.user));

        // 🔀 перенаправляем в зависимости от роли
        if (data.user.role === 'admin') {
          navigate('/profile');
        } else {
          navigate('/');
        }
      } else {
        setMessage(data.message || 'Неверный логин или пароль');
      }
    } catch (error) {
      setMessage('Ошибка подключения к серверу');
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Вход</h2>
      <form onSubmit={handleLogin}>
        <input
          className="auth-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="auth-input"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="auth-button" type="submit">Войти</button>
      </form>
      {message && <p className="auth-message">{message}</p>}

      <p className="auth-link">
        Нет аккаунта?{' '}
        <span className="auth-link-text" onClick={() => navigate('/register')}>
          Зарегистрироваться
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
