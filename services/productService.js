const productDao = require("../models/productDao");

const createProduct = async (
  category_id,
  title,
  thumbnail,
  description,
  price,
  discount
) => {
  const maxPrice = 200000000;
  if (price > maxPrice) {
    const err = new Error("상품 금액을 잘 못 설정하였습니다.");
    err.statusCode = 400;
    throw err;
  }
  const createProduct = await productDao.createProduct(
    category_id,
    title,
    thumbnail,
    description,
    price,
    discount
  );
  return createProduct;
};

// 상품목록 GET service
const getProductList = async () => {
  const product = await productDao.getProductList();
  return product;
};

// 상품상세 GET service
const getProduct = async (id) => {
  const product = await productDao.getProduct(id);
  return product;
};

module.exports = {
  createProduct,
  getProductList,
  getProduct,
};
