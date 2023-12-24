const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  totalPrice: {
    type: Number,
    required: true,
  },
  qty:{
    type:Number
  },
  // Add more fields as needed
});

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
  orderItems: [productSchema], // Array of products
  // Add more fields as needed
});

const Return = mongoose.model('Return', returnSchema);

module.exports = Return;
