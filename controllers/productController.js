// productController.js

const productService = require("../services/productService");

const createProduct = async (req, res) => {
  try {
    const { categoryId, title, thumbnail, description, price, discount } =
      req.body;
    if (
      !categoryId ||
      !title ||
      !thumbnail ||
      !description ||
      !price ||
      !discount
    ) {
      return res.status(400).json({ message: "product data input exist null" });
    }

    await productService.products(
      categoryId,
      title,
      thumbnail,
      description,
      price,
      discount
    );

    res.status(201).json({ message: "product data input in " });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

/*
- 가격필터 적용 경우의 수
1. minPrice < x
2. minPrice < x < maxPrice
3. x < maxPrice
*/
const getProductList = async (req, res) => {
  const { categoryId, minPrice, maxPrice, order, limit, page } = req.query;
  const allCategoryProduct = await productService.getProductList(
    categoryId,
    minPrice,
    maxPrice,
    order,
    limit,
    page
  );
  res.status(200).json({ data: allCategoryProduct });
};

const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400);
    }
    const product = await productService.getProduct(id);
    res.status(200).json(product);
  } catch (err) {
    return res.status(500);
  }
};

module.exports = {
  createProduct,
  getProductList,
  getProduct,
};
