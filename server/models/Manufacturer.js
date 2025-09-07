const mongoose = require('mongoose');

const manufacturerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  country: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  website: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Manufacturer', manufacturerSchema);
