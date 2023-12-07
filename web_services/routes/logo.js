const express = require('express');
const router = express.Router();
const Logo = require('./../models/logo');

// Route to save a logo URL
router.post('/upload-logo', async (req, res) => {
  try {
    const { logoUrl } = req.body;

    // Validate the input
    if (!logoUrl) {
      return res.status(400).json({ message: 'Logo URL is required.' });
    }

    // Create a new logo instance
    const logo = new Logo({ logoUrl });

    // Save the logo to the database
    await logo.save();

    res.status(201).json({ message: 'Logo URL saved successfully.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to get all logos (optional)
router.get('/all', async (req, res) => {
  try {
    const logos = await Logo.find();
    res.status(200).json({ logos });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//put request that will update Url on the basis of id
router.put('/update/:id', async (req, res) => {
  try {
    const { logoUrl } = req.body;
    const logoId = req.params.id;

    // Validate the input
    if (!logoUrl) {
      return res.status(400).json({ message: 'Logo URL is required.' });
    }

    // Update the logo in the database based on logoId
    const updatedLogo = await Logo.findByIdAndUpdate(logoId, { logoUrl }, { new: true });

    if (!updatedLogo) {
      return res.status(404).json({ message: 'Logo not found.' });
    }

    res.status(200).json({ message: 'Logo URL updated successfully.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// api to get only first url from the db
router.get('/first', async (req, res) => {
  try {
    const logo = await Logo.findOne();
    res.status(200).json({ logo });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
 

module.exports = router;
