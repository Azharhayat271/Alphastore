const express = require('express');
const router = express.Router();
const Return = require('./../models/return');

// Route to submit return details
router.post('/', async (req, res) => {
  try {
    let { orderId, reason, comments, returnDetails } = req.body;
    reason = returnDetails.reason;
    comments = returnDetails.comments;
    console.log('orderId', reason, comments, returnDetails);
    // You can perform validation or additional logic here

    // Save the return details to the database
    const newReturn = new Return({ orderId, reason, comments });
    await newReturn.save();

    res.json({ success: true, message: 'Return details submitted successfully' });
  } catch (error) {
    console.error('Error submitting return details', error);
    res.status(500).json({ success: false, message: 'Failed to submit return details' });
  }
});

module.exports = router;
