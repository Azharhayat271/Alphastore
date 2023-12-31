// installmentModel.js
const mongoose = require('mongoose');

const installmentSchema = new mongoose.Schema({
  user: String,
  products: [
    {
      productId: String,
      name: String,
      price: Number,
      qty: Number,
      image: String,
    },
  ],
  paymentMethod: String,
  totalPrice: String,
  installmentPlan: String,
  installments: [
    {
      amount: String,
      dueDate: Date,
      isPaid: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const Installment = mongoose.model('Installment', installmentSchema);

module.exports = Installment;
