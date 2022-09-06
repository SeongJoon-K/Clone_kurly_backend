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

module.exports = {
    baskets
}

