const mongoose = require('mongoose');

const orderHistorySchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  field: { type: String, required: true },
  oldValue: String,
  newValue: String,
  changedAt: { type: Date, default: Date.now },
  changedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('OrderHistory', orderHistorySchema);
