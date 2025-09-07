import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/ManageManufacturers.css';

const ManageManufacturers = () => {
  const [manufacturers, setManufacturers] = useState([]);
  const [formData, setFormData] = useState({ name: '', country: '', address: '', website: '' });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  const fetchManufacturers = async () => {
    try {
      const res = await axios.get('/api/manufacturers');
      setManufacturers(res.data);
    } catch {
      setMessage('Ошибка загрузки производителей');
    }
  };

  useEffect(() => {
    fetchManufacturers();
  }, []);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/manufacturers/${editingId}`, formData, { withCredentials: true });
        setMessage('Производитель обновлён');
      } else {
        await axios.post('/api/manufacturers', formData, { withCredentials: true });
        setMessage('Производитель добавлен');
      }
      setFormData({ name: '', country: '', address: '', website: '' });
      setEditingId(null);
      fetchManufacturers();
    } catch {
      setMessage('Ошибка при сохранении производителя');
    }
  };

  const handleEdit = (man) => {
    setEditingId(man._id);
    setFormData({
      name: man.name,
      country: man.country,
      address: man.address || '',
      website: man.website || '',
    });
    setMessage('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить производителя?')) return;
    try {
      await axios.delete(`/api/manufacturers/${id}`, { withCredentials: true });
      setMessage('Производитель удалён');
      fetchManufacturers();
    } catch {
      setMessage('Ошибка при удалении производителя');
    }
  };

  return (
    <div className="manage-manufacturers-page">
      <h2>Управление производителями</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Название" value={formData.name} onChange={handleChange} required />
        <input name="country" placeholder="Страна" value={formData.country} onChange={handleChange} required />
        <input name="address" placeholder="Адрес" value={formData.address} onChange={handleChange} />
        <input name="website" placeholder="Сайт" value={formData.website} onChange={handleChange} />
        <button type="submit">{editingId ? 'Обновить' : 'Добавить'}</button>
        {editingId && <button type="button" onClick={() => {
          setEditingId(null);
          setFormData({ name: '', country: '', address: '', website: '' });
          setMessage('');
        }}>Отмена</button>}
      </form>

      <ul>
        {manufacturers.map(man => (
          <li key={man._id}>
      <p><strong>Название:</strong> {man.name}</p>
      <p><strong>Страна:</strong> {man.country}</p>
      <p><strong>Адрес:</strong> {man.address || 'не указано'}</p>
      <p><strong>Сайт:</strong> {man.website ? (
        <a href={man.website} target="_blank" rel="noopener noreferrer">{man.website}</a>
      ) : 'не указано'}</p>
            <button onClick={() => handleEdit(man)}>Редактировать</button>{' '}
            <button onClick={() => handleDelete(man._id)} style={{ color: 'red' }}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageManufacturers;
