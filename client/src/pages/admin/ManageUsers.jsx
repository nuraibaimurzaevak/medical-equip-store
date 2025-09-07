import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/ManageUsers.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', role: '', password: '' });
  const [message, setMessage] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/users', { withCredentials: true });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setMessage('Ошибка загрузки пользователей');
    }
  };

  const handleBlock = async (id, isBlocked) => {
    const action = isBlocked ? 'разблокировать' : 'заблокировать';
    if (!window.confirm(`Вы уверены, что хотите ${action} пользователя?`)) return;

    try {
      await axios.put(`/api/users/${id}/block`, {}, { withCredentials: true });
      setMessage(`Пользователь ${isBlocked ? 'разблокирован' : 'заблокирован'}`);
      fetchUsers();
    } catch (err) {
      setMessage(`Ошибка при попытке ${action} пользователя`);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user._id);
    setIsCreating(false);
    setFormData({ name: user.name, email: user.email, role: user.role, password: '' });
    setMessage('');
  };

  const handleCancel = () => {
    setEditingUser(null);
    setIsCreating(false);
    setFormData({ name: '', email: '', role: '', password: '' });
    setMessage('');
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/users/${editingUser}`, formData, { withCredentials: true });
      setMessage('Пользователь обновлён');
      handleCancel();
      fetchUsers();
    } catch (err) {
      setMessage(err.response?.data?.error || 'Ошибка при обновлении');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users', formData, { withCredentials: true });
      setMessage(res.data.message || 'Пользователь создан');
      handleCancel();
      fetchUsers();
    } catch (err) {
      setMessage(err.response?.data?.error || 'Ошибка при создании');
    }
  };

  return (
    <div className="manage-users">
      <h2>Управление пользователями</h2>
      {message && <p>{message}</p>}

      {(editingUser || isCreating) && (
        <form onSubmit={editingUser ? handleUpdate : handleCreate}>
          <input
            name="name"
            placeholder="Имя"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="role"
            placeholder="Роль (admin/user)"
            value={formData.role}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            required={isCreating}
          />
          <button type="submit">{editingUser ? 'Обновить' : 'Создать'}</button>
          <button type="button" onClick={handleCancel}>Отмена</button>
        </form>
      )}

      {!editingUser && !isCreating && (
        <button onClick={() => setIsCreating(true)}>+ Новый пользователь</button>
      )}

      <ul>
        {users.map(user => (
          <li key={user._id}>
            <strong>{user.name}</strong> — {user.email} ({user.role})
            {user.isBlocked && <span style={{color: 'red'}}> (Заблокирован)</span>}
            <br />
            <button onClick={() => handleEditClick(user)}>Редактировать</button>
            <button 
              onClick={() => handleBlock(user._id, user.isBlocked)} 
              style={{ color: user.isBlocked ? 'green' : 'red' }}
            >
              {user.isBlocked ? 'Разблокировать' : 'Заблокировать'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
