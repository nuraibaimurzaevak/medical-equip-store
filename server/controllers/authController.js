const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// РЕГИСТРАЦИЯ — только для покупателей
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Проверка сложности пароля
    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      return res.status(400).json({
        message:
          'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.',
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      passwordHash,
      role: 'customer',
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ВХОД с установкой токена в cookie
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.isBlocked) {
      return res.status(401).json({ message: 'Invalid credentials or account blocked' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // ✅ Устанавливаем cookie с правильными параметрами
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // ❗ ставь true только на HTTPS (на проде)
      sameSite: 'Lax', // можно использовать 'None' если клиент и сервер на разных доменах и HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 день
    });

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ВЫХОД — очистка cookie
const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
  });
  res.json({ message: 'Logged out successfully' });
};

module.exports = { register, login, logout };
