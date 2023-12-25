const mongoose = require("mongoose");

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
  orderItems: [
    {
      name: String,
      qty: Number,
      price: Number, 
      image: String,
      product: String,
      
    },
  ],
});

const Return = mongoose.model("Return", returnSchema);

module.exports = Return;
