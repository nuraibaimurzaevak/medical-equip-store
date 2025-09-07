const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manufacturer'
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  imageUrl: String
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
