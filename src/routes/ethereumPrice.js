const express = require('express');

const ethereumPriceController = require('../controllers/ethereumPrice');

const router = express.Router();

router.get('/price', ethereumPriceController.getEthereumPrice);

module.exports = router;
