const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middlewares/authMiddleware');
const checkAdmin = require('../middlewares/checkAdmin');

// Получить все товары или по категории
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const products = await Product.find(filter)
      .populate('category')
      .populate('manufacturer');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Получить один товар по ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category')
      .populate('manufacturer');
    if (!product) {
      return res.status(404).json({ error: 'Товар не найден' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Добавить новый товар (только для админа)
router.post('/', auth, checkAdmin, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
await newProduct.save();

// повторно достаём с populate
const populatedProduct = await Product.findById(newProduct._id)
  .populate('category')
  .populate('manufacturer');

res.status(201).json(populatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Обновить товар (только для админа)
router.put('/:id', auth, checkAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Товар не найден' });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Удалить товар (только для админа)
router.delete('/:id', auth, checkAdmin, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Товар не найден' });
    }
    res.json({ message: 'Товар удален' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
