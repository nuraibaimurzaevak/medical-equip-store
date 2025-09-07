const mongoose = require('mongoose');

const auditPlanSchema = new mongoose.Schema({
  auditor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  planName: { type: String, required: true },
  description: String,
  riskCriteria: [String],
  riskScale: {
    low: String,
    medium: String,
    high: String
  },
  preventionPlan: String,
  report: String,
  results: String
}, { timestamps: true });

module.exports = mongoose.model('AuditPlan', auditPlanSchema);
