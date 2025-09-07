const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Получить все продукты
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category', 'name')
      .populate('manufacturer', 'name');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при загрузке продуктов' });
  }
});

// Получить один продукт
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name')
      .populate('manufacturer', 'name');
    if (!product) return res.status(404).json({ error: 'Продукт не найден' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при загрузке продукта' });
  }
});

// Создать продукт
router.post('/', async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      manufacturer: req.body.manufacturer,
      price: req.body.price,
      stock: req.body.stock,
      imageUrl: req.body.imageUrl
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при создании продукта' });
  }
});

// Обновить продукт
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Продукт не найден' });

    product.name = req.body.name;
    product.description = req.body.description;
    product.category = req.body.category;
    product.manufacturer = req.body.manufacturer;
    product.price = req.body.price;
    product.stock = req.body.stock;
    product.imageUrl = req.body.imageUrl;

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при обновлении продукта' });
  }
});

// Удалить продукт
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Продукт не найден' });
    res.json({ message: 'Продукт удалён' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при удалении продукта' });
  }
});

module.exports = router;
