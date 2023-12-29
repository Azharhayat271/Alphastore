// routes.js
const express = require('express');
const router = express.Router();
const { createInstallment } = require('./../controller/installment');
const { getInstallmentById } = require('./../controller/installment');
const { setInstallmentAsPaid } = require('./../controller/installment');

// Your other routes...

// Create Installment Route
router.post('/create', createInstallment);
router.get('/get/:id', getInstallmentById);
router.post('/setPaid', setInstallmentAsPaid);




module.exports = router;
