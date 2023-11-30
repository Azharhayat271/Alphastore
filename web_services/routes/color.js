const express = require('express');
const router = express.Router();
const ColorModel = require('./../models/coloesetting');

// Get colors
router.get('/colors', async (req, res) => {
  try {
    const colors = await ColorModel.find();
    res.json(colors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Save colors
router.post('/savecolors', async (req, res) => {
  const { headerColor, bodyColor } = req.body;

  try {
    // You can add validation or sanitation here if needed
    const newColor = new ColorModel({ headerColor, bodyColor });
    await newColor.save();

    res.json({ message: 'Colors saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

//put request 
router.put('/updatecolors/:id', async (req, res) => {
  const { headerColor, bodyColor } = req.body;

  try {
    // You can add validation or sanitation here if needed
    const updatedColor = await ColorModel.findOneAndUpdate(
      { _id: req.params.id },
      { headerColor, bodyColor },
      { new: true }
    );

    res.json({ message: 'Colors updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
