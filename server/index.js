// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // 👈 Добавляем cookie-parser
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const manufacturerRoutes = require('./routes/manufacturerRoutes');
const orderRoutes = require('./routes/orderRoutes');



const app = express();
 const allowedOrigins = [
            'https://veterinary-clinic-front.onrender.com',
      'https://magical-belekoy-c5a3b3.netlify.app',
      'http://localhost:3000',
      'http://localhost:5173',
      'http://127.0.0.1:3000',
      'http://localhost:10000'
    ];
// ⚠️ Настройка CORS: разрешаем доступ с клиента + куки
app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser()); // 👈 Добавляем мидлвару cookie-parser
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Подключение маршрутов
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/manufacturers', manufacturerRoutes);
app.use('/api/orders', orderRoutes);




const PORT = process.env.PORT || 5000;

// Подключение к MongoDB и запуск сервера
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
