const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.post("/", productController.createProduct); // 상품 데이터 생성
router.get("/", productController.getProductList); // 상품 목록에 있는 상품 리스트 출력
router.get("/:id", productController.getProduct); // 상품 상세 정보 출력

module.exports = {
  router,
};
