// 장바구니 basketService.js
const basketDao = require('../models/basketDao');
const jwt = require('jsonwebtoken');

const baskets = async (token, product_id, amount) => {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const createBasket = await basketDao.createBasket(
        decoded.id,
        product_id, 
        amount
    );
};

const getbasket = async (token) => {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    // console.log(decoded, "GET baskets dedcoece")
    const basket = await basketDao.getbasket(decoded.id);
    console.log(basket,"qwdqwdqw");
    return basket;
}

const updatebasket = async (id, amount) => {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const basket = await basketDao.updatebasket(decoded.id);
    return basket;
}

const deletebasket = async(id) => {
    const basket = await basketDao.deletebasket(id);
    return basket;
}

module.exports = {
    baskets,
    getbasket,
    updatebasket,
    deletebasket
}

