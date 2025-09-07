import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ⬅️ добавили
import '../index.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // ⬅️ создаём навигатор

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // 👉 Проверка пароля
  const isValidPassword = (password) => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return minLength && hasUppercase && hasNumber && hasSpecialChar;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const { name, email, password } = formData;

  if (!name || !email || !password) {
    setMessage('Пожалуйста, заполните все поля');
    return;
  }

  if (!isValidPassword(password)) {
    setMessage('Пароль должен быть не менее 8 символов, содержать заглавную букву, цифру и спецсимвол');
    return;
  }

  try {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await res.json().catch(() => ({})); // обработка JSON-ошибок

    if (res.ok) {
      setMessage('');
      navigate('/profile'); // использовать роутинг, а не .html
    } else {
      setMessage(data.message || 'Ошибка при регистрации');
    }
  } catch (error) {
    setMessage('Сервер не отвечает');
  }
};

  return (
    <div className="auth-container">
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="auth-input"
          type="text"
          name="name"
          placeholder="Имя"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          className="auth-input"
          type="email"
          name="email"
          placeholder="Почта"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="auth-input"
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="auth-button" type="submit">Зарегистрироваться</button>
      </form>
      {message && <p className="auth-message">{message}</p>}

       <p className="auth-link">
        Уже есть аккаунт?{' '}
        <span className="auth-link-text" onClick={() => navigate('/login')}>
          Войти
        </span>
      </p>

    </div>
  );
};

export default RegisterForm;
