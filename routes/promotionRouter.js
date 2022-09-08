const express = require('express');
const promotionController = require('../controllers/promotionController');

const router = express.Router();

router.get('/', promotionController.promotions);

module.exports = {
    router
}