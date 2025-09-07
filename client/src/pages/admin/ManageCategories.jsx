import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [message, setMessage] = useState('');

  // Загрузка категорий с сервера
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories'); // или полный адрес, если надо
      setCategories(res.data);
    } catch (error) {
      console.error('Ошибка при загрузке категорий', error);
    }
  };

  // Обработка изменений в форме
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Добавление новой категории
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setMessage('Название категории обязательно');
      return;
    }

    try {
      await axios.post('/api/categories', formData, { withCredentials: true });
      setMessage('Категория успешно добавлена');
      setFormData({ name: '', description: '' });
      fetchCategories();
    } catch (error) {
      setMessage(error.response?.data?.error || 'Ошибка при добавлении категории');
    }
  };

  // Удаление категории
  const handleDelete = async (id) => {
    if (!window.confirm('Удалить категорию?')) return;

    try {
      await axios.delete(`/api/categories/${id}`, { withCredentials: true });
      fetchCategories();
    } catch (error) {
      alert('Ошибка при удалении категории');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h2>Управление категориями</h2>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          name="name"
          placeholder="Название категории"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <textarea
          name="description"
          placeholder="Описание (необязательно)"
          value={formData.description}
          onChange={handleChange}
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <button type="submit">Добавить категорию</button>
      </form>

      <ul>
        {categories.map(cat => (
          <li key={cat._id} style={{ marginBottom: 10, borderBottom: '1px solid #ccc', paddingBottom: 10 }}>
            <strong>{cat.name}</strong><br />
            <small>{cat.description}</small><br />
            <button onClick={() => handleDelete(cat._id)} style={{ marginTop: 5, color: 'red' }}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCategories;
