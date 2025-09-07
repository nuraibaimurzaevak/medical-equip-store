import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/ManageProducts.css';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    manufacturer: '',
    price: '',
    stock: '',
    imageUrl: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  // Загрузка продуктов
  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      setMessage('Ошибка загрузки продуктов');
    }
  };

  // Загрузка категорий и производителей
  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchManufacturers = async () => {
    try {
      const res = await axios.get('/api/manufacturers');
      setManufacturers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchManufacturers();
  }, []);

  // Обработка формы
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Создание или обновление продукта
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/products/${editingId}`, formData, { withCredentials: true });
        setMessage('Продукт обновлён');
      } else {
        await axios.post('/api/products', formData, { withCredentials: true });
        setMessage('Продукт добавлен');
      }
      setFormData({
        name: '',
        description: '',
        category: '',
        manufacturer: '',
        price: '',
        stock: '',
        imageUrl: ''
      });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      setMessage(err.response?.data?.error || 'Ошибка при сохранении');
    }
  };

  // Редактирование
  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description || '',
      category: product.category?._id || '',
      manufacturer: product.manufacturer?._id || '',
      price: product.price,
      stock: product.stock,
      imageUrl: product.imageUrl || ''
    });
    setEditingId(product._id);
    setMessage('');
  };

  // Удаление
  const handleDelete = async (id) => {
    if (!window.confirm('Удалить продукт?')) return;
    try {
      await axios.delete(`/api/products/${id}`, { withCredentials: true });
      setMessage('Продукт удалён');
      fetchProducts();
    } catch (err) {
      setMessage('Ошибка при удалении продукта');
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 20, backgroundColor: '#f7f6f3' }}>
      <h2>Управление продуктами</h2>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit} style={{ marginBottom: 10, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          name="name"
          placeholder="Название"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ flex: '50px' }}
        />
        <input
          name="description"
          placeholder="Описание"
          value={formData.description}
          onChange={handleChange}
          style={{ flex: '50px' }}
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          style={{ flex: '50px' }}
        >
          <option value="">Выберите категорию</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
        <select
          name="manufacturer"
          value={formData.manufacturer}
          onChange={handleChange}
          required
          style={{ flex: '50px' }}
        >
          <option value="">Выберите производителя</option>
          {manufacturers.map(man => (
            <option key={man._id} value={man._id}>{man.name}</option>
          ))}
        </select>
        <input
          name="price"
          type="number"
          placeholder="Цена"
          value={formData.price}
          onChange={handleChange}
          required
          style={{ flex: '50px' }}
        />
        <input
          name="stock"
          type="number"
          placeholder="Количество на складе"
          value={formData.stock}
          onChange={handleChange}
          required
          style={{ flex: '50px' }}
        />
        <input
          name="imageUrl"
          placeholder="URL картинки"
          value={formData.imageUrl}
          onChange={handleChange}
          style={{ flex: '50px' }}
        />
        <button type="submit" style={{ flex: '50px' }}>
          {editingId ? 'Обновить продукт' : 'Добавить продукт'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setFormData({ name: '', description: '', category: '', manufacturer: '', price: '', stock: '', imageUrl: '' });
              setMessage('');
            }}
            style={{ flex: '50px' }}
          >
            Отмена
          </button>
        )}
      </form>

      <ul>
        {products.map(prod => (
          <li key={prod._id} style={{ marginBottom: 10, borderBottom: '1px solid #ccc', paddingBottom: 10 }}>
            <strong>{prod.name}</strong> — {prod.price} ₽ <br />
            Категория: {prod.category?.name || 'не задана'} <br />
            Производитель: {prod.manufacturer?.name || 'не задан'} <br />
            Остаток: {prod.stock} <br />
            <button onClick={() => handleEdit(prod)}>Редактировать</button>{' '}
            <button onClick={() => handleDelete(prod._id)} style={{ color: 'red' }}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageProducts;
