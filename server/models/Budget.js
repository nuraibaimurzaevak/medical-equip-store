const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  type: { type: String, enum: ['income', 'expense'], required: true },
  amount: { type: Number, required: true },
  description: String,
  linkedOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Budget', budgetSchema);
