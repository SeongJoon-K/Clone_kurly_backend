// productController.js

const productService = require("../services/productService");

const products = async (req, res) => {
  try {
    const { category_id, title, thumbnail, description, price, discount } =
      req.body;

    if (
      !category_id ||
      !title ||
      !thumbnail ||
      !description ||
      !price ||
      !discount
    ) {
      return res.status(400).json({ message: "product data input exist null" });
    }

    await productService.products(
      category_id,
      title,
      thumbnail,
      description,
      price,
      discount
    );

    res.status(201).json({ message: "상품정보가 성공적으로 입력되었습니다." });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getproduct = async (req, res) => {
  const product = await productService.getproduct();
  res.status(200).json(product);
};

const detailproduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400);
    }
    const product = await productService.detailproduct(id);
    res.status(200).json(product);
  } catch (err) {
    return res.status(500);
  }
};

module.exports = {
  products,
  getproduct,
  detailproduct,
};
