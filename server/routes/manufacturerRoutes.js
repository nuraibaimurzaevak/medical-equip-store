// routes/manufacturerRoutes.js
const express = require('express');
const router = express.Router();

const Manufacturer = require('../models/Manufacturer');
const authMiddleware = require('../middlewares/authMiddleware');
const checkAdmin = require('../middlewares/checkAdmin');

// Получить всех производителей (для всех пользователей)
router.get('/', async (req, res) => {
  try {
    const manufacturers = await Manufacturer.find();
    res.json(manufacturers);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Получить производителя по ID (для админа — полный объект)
router.get('/:id', authMiddleware, checkAdmin, async (req, res) => {
  try {
    const manufacturer = await Manufacturer.findById(req.params.id);
    if (!manufacturer) return res.status(404).json({ error: 'Производитель не найден' });
    res.json(manufacturer);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Создать производителя (только админ)
router.post('/', authMiddleware, checkAdmin, async (req, res) => {
  try {
    const { name, country, address, website } = req.body;
    if (!name || !country) {
      return res.status(400).json({ error: 'Имя и страна обязательны' });
    }

    const exists = await Manufacturer.findOne({ name });
    if (exists) {
      return res.status(400).json({ error: 'Производитель с таким именем уже существует' });
    }

    const manufacturer = new Manufacturer({ name, country, address, website });
    await manufacturer.save();

    res.status(201).json(manufacturer);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при создании производителя' });
  }
});

// Обновить производителя (только админ)
router.put('/:id', authMiddleware, checkAdmin, async (req, res) => {
  try {
    const { name, country, address, website } = req.body;
    const manufacturer = await Manufacturer.findById(req.params.id);
    if (!manufacturer) return res.status(404).json({ error: 'Производитель не найден' });

    if (name) manufacturer.name = name;
    if (country) manufacturer.country = country;
    if (address) manufacturer.address = address;
    if (website) manufacturer.website = website;

    await manufacturer.save();
    res.json(manufacturer);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при обновлении производителя' });
  }
});

// Удалить производителя (только админ)
router.delete('/:id', authMiddleware, checkAdmin, async (req, res) => {
  try {
    const deleted = await Manufacturer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Производитель не найден' });
    res.json({ message: 'Производитель удалён' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при удалении производителя' });
  }
});

module.exports = router;
