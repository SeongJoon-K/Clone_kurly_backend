const productDao = require("../models/productDao");
const { login } = require("./userService");

const createProduct = async (
  categoryId,
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
    categoryId,
    title,
    thumbnail,
    description,
    price,
    discount
  );
  return createProduct;
};

// 상품목록 GET service
const getProductList = async (categoryId, minPrice, maxPrice, order, page) => {
  const getProductList = await productDao.getProductList(
    categoryId,
    minPrice,
    maxPrice,
    order,
    page
  );
  return getProductList;
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
