const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/', productController.products); // 상품 데이터 생성
router.get('/', productController.getproduct); // 상품 목록에 있는 상품 리스트 출력
router.get('/:id', productController.detailproduct); // 상품 상세 정보 출력

module.exports = {
    router
}  