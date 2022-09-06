const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/producted', productController.products);
router.get('/:id', productController.getproduct);
router.get('/detail/:id', productController.detailproduct);

module.exports = {
    router
}  