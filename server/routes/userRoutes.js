const express = require('express');
const router = express.Router();

const User = require('../models/User');
const authMiddleware = require('../middlewares/authMiddleware');
const checkAdmin = require('../middlewares/checkAdmin');
const bcrypt = require('bcryptjs');

// Получить всех пользователей (только админ)
router.get('/', authMiddleware, checkAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash'); // исключаем пароль
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Заблокировать пользователя
router.put('/:id/block', authMiddleware, checkAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Пользователь не найден' });

    user.isBlocked = true;
    await user.save();

    res.json({ message: 'Пользователь заблокирован' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при блокировке пользователя' });
  }
});

router.put('/:id/unblock', authMiddleware, checkAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Пользователь не найден' });

    user.isBlocked = false;
    await user.save();

    res.json({ message: 'Пользователь разблокирован' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при разблокировке пользователя' });
  }
});

// Обновить пользователя по ID (только админ)
router.put('/:id', authMiddleware, checkAdmin, async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, role, password } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'Пользователь не найден' });

    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.passwordHash = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json({ message: 'Пользователь обновлён', user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при обновлении пользователя' });
  }
});

// Получить текущего пользователя (профиль)
router.get('/me', authMiddleware, async (req, res) => {
  res.json({ user: req.user });
});

// Обновить профиль текущего пользователя
router.put('/me', authMiddleware, async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: 'Пользователь не найден' });

    if (name) user.name = name;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.passwordHash = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json({ message: 'Профиль обновлён', user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при обновлении профиля' });
  }
});
// Создать нового пользователя (только админ)
router.post('/', authMiddleware, checkAdmin, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'Все поля обязательны' });
    }

    // Проверка на существующий email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, passwordHash, role });
    await newUser.save();

    res.status(201).json({ message: 'Пользователь создан', user: { _id: newUser._id, name, email, role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера при создании пользователя' });
  }
});


module.exports = router;
