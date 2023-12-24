const express = require('express');
const router = express.Router();
const Return = require('./../models/return');

// Route to submit return details
router.post('/', async (req, res) => {
  try {
    const { orderId, returnDetails } = req.body;
    const { orderItems } = returnDetails;
    const { comments, reason } = returnDetails.additionalData;

    // Validate input data (you can add more specific validation logic)
    if (!orderId || !orderItems || !comments || !reason) {
      return res.status(400).json({ success: false, message: 'Invalid input data' });
    }

    // Save the return details to the database
    const newReturn = new Return({ orderId, reason, comments, orderItems });
    await newReturn.save();

    res.json({ success: true, message: 'Return details submitted successfully' });
  } catch (error) {
    console.error('Error submitting return details', error);
    res.status(500).json({ success: false, message: 'Failed to submit return details' });
  }
});

// Route to get all return details
router.get('/all', async (req, res) => {
  try {
    // Retrieve all return details from the database
    const allReturns = await Return.find();

    res.json({ success: true, returns: allReturns });
  } catch (error) {
    console.error('Error getting all return details', error);
    res.status(500).json({ success: false, message: 'Failed to get return details' });
  }
});

// Route to get return details by ID
router.get('/:id', async (req, res) => {
  try {
    const returnId = req.params.id;

    // Retrieve return details by ID from the database
    const returnDetails = await Return.findById(returnId);

    if (!returnDetails) {
      return res.status(404).json({ success: false, message: 'Return details not found' });
    }

    res.json({ success: true, return: returnDetails });
  } catch (error) {
    console.error('Error getting return details by ID', error);
    res.status(500).json({ success: false, message: 'Failed to get return details' });
  }
});

module.exports = router;
