const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Warehouse', warehouseSchema);
