// installmentController.js
const Installment = require('../models/installments');

const createInstallment = async (req, res) => {
  try {
    const { products, paymentMethod, totalPrice, installmentPlan , user} = req.body;

    // Assuming you have a user associated with the installment
    const userId = req.user; // Adjust this based on your authentication setup

    // Calculate installment amount based on the selected plan
    const installmentAmount = Math.trunc(totalPrice / parseInt(installmentPlan));

    // Calculate due dates for installments
    const installmentDueDates = Array.from({ length: parseInt(installmentPlan) }, (_, index) => {
      const dueDate = new Date();
      dueDate.setMonth(dueDate.getMonth() + index + 1); // Add months based on index
      return dueDate;
    });

    const installments = installmentDueDates.map((dueDate) => ({
      amount: installmentAmount.toString(),
      dueDate,
    }));

    const installment = new Installment({
      user: userId,
      products,
      paymentMethod,
      totalPrice,
      installmentPlan,
      installments,
    });

    await installment.save();

    res.json({ success: true, message: 'Installment plan created successfully' });
  } catch (error) {
    console.error('Error creating installment plan', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { createInstallment };
