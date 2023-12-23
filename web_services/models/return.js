const mongoose = require('mongoose');

const returnSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  comments: String,
  // Add more fields as needed
});

const Return = mongoose.model('Return', returnSchema);

module.exports = Return;
