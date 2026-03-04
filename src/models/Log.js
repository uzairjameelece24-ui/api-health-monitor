const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  apiId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Api',
    required: true,
    index: true // Index this field for faster queries later
  },
  statusCode: {
    type: Number,
    required: false // Kept optional: a complete network failure (e.g., DNS error) won't have an HTTP status
  },
  responseTime: {
    type: Number,
    required: true
  },
  success: {
    type: Boolean,
    required: true
  }
}, { 
  // Map Mongoose's automatic `createdAt` to your requested `timestamp` field
  // Logs are append-only, so we don't need an `updatedAt` field.
  timestamps: { createdAt: 'timestamp', updatedAt: false } 
});

module.exports = mongoose.model('Log', logSchema);