const express = require('express');
const promotionController = require('../controllers/promotionController');

const router = express.Router();

router.get('/:id', promotionController.promotions);

module.exports = {
    router
}