const express = require('express');

const balanceController = require('../controllers/balance');

const router = express.Router();

router.get('/:address', balanceController.getCurrentBalance);

module.exports = router;
