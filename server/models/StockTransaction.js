const mongoose = require('mongoose');

const stockTransactionSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  type: {
    type: String,
    enum: ['приход', 'расход'],
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  pricePerUnit: {
    type: Number,
    required: true // для прихода = закупка, для расхода = цена продажи
  },
  date: {
    type: Date,
    default: Date.now
  },
  note: String // комментарий, например "поставка от поставщика"
});

module.exports = mongoose.model('StockTransaction', stockTransactionSchema);
