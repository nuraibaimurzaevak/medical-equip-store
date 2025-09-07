const Order = require('../models/Order');
const OrderHistory = require('../models/OrderHistory');

// Получить все заказы
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('products.product', 'name price');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при загрузке заказов' });
  }
};

// Получить один заказ
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('products.product', 'name price');
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при загрузке заказа' });
  }
};

// Обновить заказ
exports.updateOrder = async (req, res) => {
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

    if (changes.length > 0) {
      await OrderHistory.insertMany(
        changes.map(change => ({
          order: order._id,
          field: change.field,
          oldValue: change.oldValue?.toString(),
          newValue: change.newValue?.toString(),
          changedBy: req.user?._id // если у тебя есть аутентификация
        }))
      );
    }

    res.json({ message: 'Заказ обновлён', order });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при обновлении заказа' });
  }
};

// История изменений заказа
exports.getOrderHistory = async (req, res) => {
  try {
    const history = await OrderHistory.find({ order: req.params.id })
      .populate('changedBy', 'name email')
      .sort({ changedAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при загрузке истории' });
  }
};
