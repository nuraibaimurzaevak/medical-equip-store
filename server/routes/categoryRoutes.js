const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const auth = require('../middlewares/authMiddleware');
const checkAdmin = require('../middlewares/checkAdmin');

// Получить все категории (доступно всем)
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Добавить новую категорию (только для админа)
router.post('/', auth, checkAdmin, async (req, res) => {
  try {
    const { name, description } = req.body;

    // Проверка на дубликаты
    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(400).json({ error: 'Категория с таким названием уже существует.' });
    }

    const category = new Category({ name, description });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// Удалить категорию (только для админа)
router.delete('/:id', auth, checkAdmin, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Категория не найдена' });
    }
    res.json({ message: 'Категория успешно удалена' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при удалении категории' });
  }
});


module.exports = router;
