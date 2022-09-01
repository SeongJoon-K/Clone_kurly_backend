const productDao = require('../models/productDao');

const products = async (category_id ,title, thumbnail, description, price) => {
    const maxPrice = 200000000;
    if (price > maxPrice) {
        const err = new Error('상품 금액을 잘 못 설정하였습니다.');
        err.statusCode = 400;
        throw err;
    }   
    const createProduct = await productDao.createProduct(
        category_id,
        title,
        thumbnail,
        description,
        price
    );
    return createProduct;
};

module.exports = {
    products
}