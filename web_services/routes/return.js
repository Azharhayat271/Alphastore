const express = require('express');
const router = express.Router();
const Return = require('./../models/return');

// Route to submit return details
router.post('/', async (req, res) => {
  try {
    const { orderId, returnDetails } = req.body;
    const  orderItems  = returnDetails.orderItems;
    const { comments, reason } = returnDetails.additionalData;
    debugger
    console.log(orderItems);


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

// route to get on the basis of orderId
router.get('/find/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;

    // Retrieve return details by ID from the database
    const returnDetails = await Return.findOne({ orderId });

    if (!returnDetails) {
      return res.status(404).json({ success: false, message: 'Return details not found' });
    }

    res.json({ success: true, return: returnDetails });
  } catch (error) {
    console.error('Error getting return details by ID', error);
    res.status(500).json({ success: false, message: 'Failed to get return details' });
  }
});

// route to delete return details by orderId
router.delete('/delete/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;

    // Delete return details by ID from the database
    const returnDetails = await Return.findOneAndDelete({ orderId });

    if (!returnDetails) {
      return res.status(404).json({ success: false, message: 'Return details not found' });
    }

    res.json({ success: true, message: 'Return details deleted successfully' });
  } catch (error) {
    console.error('Error deleting return details by ID', error);
    res.status(500).json({ success: false, message: 'Failed to delete return details' });
  }
});

module.exports = router;
