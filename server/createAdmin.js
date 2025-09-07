// createAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // путь к модели пользователя

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const existing = await User.findOne({ role: 'admin' });
  if (existing) {
    console.log('Админ уже существует');
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash('Adminpassword1!', 10);

  const admin = new User({
    name: 'Admin',
    email: 'nurajbajmurzaeva78@gmail.com',
    passwordHash,
    role: 'admin'
  });

  await admin.save();
  console.log('✅ Первый админ создан');

  mongoose.disconnect();
}

createAdmin();
