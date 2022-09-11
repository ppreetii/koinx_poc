const express = require('express');

const transactionController = require('../controllers/transaction');

const router = express.Router();

router.get('/:address', transactionController.getTransactionList);

module.exports = router;
