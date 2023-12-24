const express = require('express');
const router = express.Router();
const Return = require('./../models/return');

// Route to submit return details
router.post('/', async (req, res) => {
  try {
    const { orderId, returnDetails } = req.body;
    const { orderItems } = returnDetails.orderItems;
    const comments=returnDetails.additionalData.comments;
    const reason=returnDetails.additionalData.reason;

    // You can perform validation or additional logic here

    // Save the return details to the database
    const newReturn = new Return({ orderId, reason, comments, orderItems });
    await newReturn.save();

    res.json({ success: true, message: 'Return details submitted successfully' });
  } catch (error) {
    console.error('Error submitting return details', error);
    res.status(500).json({ success: false, message: 'Failed to submit return details' });
  }
});

module.exports = router;
