const mongoose = require('mongoose');

const apiSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  interval: {
    type: Number,
    required: true,
    default: 5, // Default to checking every 5 minutes
    min: 1      // Prevent intervals that are too aggressive
  }
}, { 
  timestamps: true // Automatically adds `createdAt` and `updatedAt`
});

module.exports = mongoose.model('Api', apiSchema);