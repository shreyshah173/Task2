const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['Pending', 'Approved'], default: 'Pending' },
  content: { type: String, required: true }
});

module.exports = mongoose.model('Document', DocumentSchema);
