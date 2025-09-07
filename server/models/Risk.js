// models/Risk.js
const mongoose = require('mongoose');

const riskSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  criteria: [String],
  methods: [String],
  degree: {
    low: String,
    medium: String,
    high: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Risk', riskSchema);
