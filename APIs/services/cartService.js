const basketDao = require("../models/cartDao");
const jwt = require("jsonwebtoken");

const baskets = async (token, product_id, amount) => {
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const createBasket = await basketDao.createBasket(
    decoded.id,
    product_id,
    amount
  );
};

const getbasket = async (token) => {
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const basket = await basketDao.getbasket(decoded.id);
  console.log(basket, "qwdqwdqw");
  return basket;
};

const updatebasket = async (token, id, amount) => {
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  if (!decoded) {
    return;
  }
  const basket = await basketDao.updatebasket(id, amount);
  return basket;
};

const deletebasket = async (token, id) => {
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  if (!decoded) {
    return;
  }
  const basket = await basketDao.deletebasket(id);
  return basket;
};

module.exports = {
  baskets,
  getbasket,
  updatebasket,
  deletebasket,
};
