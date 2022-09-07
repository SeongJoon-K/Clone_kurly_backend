const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/producted', productController.products);
router.get('/', productController.getproduct);
router.get('/:id', productController.detailproduct);

module.exports = {
    router
}  