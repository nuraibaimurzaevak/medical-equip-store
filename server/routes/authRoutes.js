const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');


router.post('/register', register); // /api/auth/register
router.post('/login', login);       // /api/auth/login
router.post('/logout', logout);      // /api/auth/logout

module.exports = router;
