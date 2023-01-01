const basketService = require("../services/basketService");
const jwt = require("jsonwebtoken");

const baskets = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const { product_id, amount } = req.body;
  if (!token || !product_id || !amount) {
    return res.status(400);
  }
  try {
    await basketService.baskets(token, product_id, amount);
    res.status(201);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getbasket = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(400).json({ message: "USER_ID IS NULL" });
    }
    const basket = await basketService.getbasket(token);
    res.status(200).json(basket);
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const updatebasket = async (req, res) => {
  const { amount } = req.body;
  const { id } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  if (!id || !amount) {
    return res.status(400).json({ message: "장바구니 정보 입력 오류" });
  }
  const basket = await basketService.updatebasket(token, id, amount);
  if (!basket) {
    res.status(400);
    return;
  }
  res.status(200).json(basket);
};

const deletebasket = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const { id } = req.params;
  if (!id || !token) {
    return res.status(400);
  }
  const basket = await basketService.deletebasket(token, id);
  res.status(200).json(basket);
};

module.exports = {
  baskets,
  getbasket,
  updatebasket,
  deletebasket,
};
