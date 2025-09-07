import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import '../styles/Catalog.css'; // Стили ниже

const CatalogPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]); // для избранных (сохраняем id товаров)

  // Загрузка категорий
  useEffect(() => {
    axios.get('/api/categories')
      .then(res => {
        setCategories(res.data);
        if (res.data.length > 0) {
          setSelectedCategoryId(res.data[0]._id);
        }
      })
      .catch(console.error);
  }, []);

  // Загрузка продуктов выбранной категории
  useEffect(() => {
    if (!selectedCategoryId) return;

    axios.get(`/api/products?category=${selectedCategoryId}`)
      .then(res => setProducts(res.data))
      .catch(console.error);
  }, [selectedCategoryId]);

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const addToCart = (product) => {
    alert(`Добавлено в корзину: ${product.name}`);
    // Здесь вызови функцию добавления в корзину
  };

  return (
     <>
      <Navbar />
    <div className="catalog-page">

      {/* Категории */}
      <nav className="categories-nav">
        {categories.map(cat => (
          <button
            key={cat._id}
            className={`category-button ${cat._id === selectedCategoryId ? 'active' : ''}`}
            onClick={() => setSelectedCategoryId(cat._id)}
          >
            {cat.name}
          </button>
        ))}
      </nav>

      {/* Сетка товаров */}
      <div className="products-grid">
        {products.map(product => (
          <div className="product-card" key={product._id}>
            {/* Сердечко для избранных */}
            <button
              className={`favorite-btn ${favorites.includes(product._id) ? 'favorited' : ''}`}
              onClick={() => toggleFavorite(product._id)}
              aria-label="Добавить в избранное"
            >
              ♥
            </button>

            <img src={product.imageUrl} alt={product.name} className="product-image" />

            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price} сом</p>
            </div>

            {/* Кнопка добавления в корзину появляется при наведении */}
            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(product)}
            >
              Добавить в корзину
            </button>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default CatalogPage;
