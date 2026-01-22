const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: '🏙️'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('District', districtSchema);
