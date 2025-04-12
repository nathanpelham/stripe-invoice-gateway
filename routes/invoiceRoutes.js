const express = require('express');
const router = express.Router();
const { lookupInvoice } = require('../controllers/invoiceController');

router.post('/lookup', lookupInvoice);

module.exports = router;
