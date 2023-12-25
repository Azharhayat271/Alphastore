// routes.js
const express = require('express');
const router = express.Router();
const { createInstallment } = require('./../controller/installment');

// Your other routes...

// Create Installment Route
router.post('/create', createInstallment);

module.exports = router;
