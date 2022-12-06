const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.post("/", productController.createProduct);

router.get("/", productController.getProductList);

router.get("/:id", productController.getProduct);

module.exports = {
  router,
};
