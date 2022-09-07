// 장바구니 basketService.js

const basketDao = require('../models/basketDao');

const baskets = async (user_id, product_id, amount) => {
    const createBasket = await basketDao.createBasket(
        user_id, 
        product_id, 
        amount
    );
    return createBasket;
};

const getbasket = async(user_id) => {
    const basket = await basketDao.getbasket(user_id);
    return basket;
}

const updatebasket = async(id,amount) => {
    const basket = await basketDao.updatebasket(id,amount);
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

