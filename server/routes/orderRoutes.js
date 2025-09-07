const express = require('express');
const Order = require('../models/Order');
const OrderHistory = require('../models/OrderHistory');
const router = express.Router();

// Получить все заказы
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('products.product', 'name price');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при загрузке заказов' });
  }
});

// Получить один заказ
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('products.product', 'name price');
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при загрузке заказа' });
  }
});

// Обновить заказ
router.put('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Заказ не найден' });

    const changes = [];
    const updatableFields = ['status', 'totalPrice'];

    updatableFields.forEach(field => {
      if (req.body[field] && req.body[field] !== order[field]) {
        changes.push({
          field,
          oldValue: order[field],
          newValue: req.body[field]
        });
        order[field] = req.body[field];
      }
    });

    order.updatedAt = new Date();
    await order.save();

    // записать изменения в историю
    if (changes.length > 0) {
      await OrderHistory.insertMany(
        changes.map(change => ({
          order: order._id,
          field: change.field,
          oldValue: change.oldValue?.toString(),
          newValue: change.newValue?.toString(),
          changedBy: req.user?._id // если есть авторизация
        }))
      );
    }

    res.json({ message: 'Заказ обновлён', order });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при обновлении заказа' });
  }
});

// История изменений заказа
router.get('/:id/history', async (req, res) => {
  try {
    const history = await OrderHistory.find({ order: req.params.id })
      .populate('changedBy', 'name email')
      .sort({ changedAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при загрузке истории' });
  }
});

module.exports = router;
