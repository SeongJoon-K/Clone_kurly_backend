const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/producted', productController.products);

module.exports = {
    router
}