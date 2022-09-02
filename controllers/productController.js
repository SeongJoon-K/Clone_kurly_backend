// productController.js

const productService = require('../services/productService');

const products = async (req, res) => {
    try {
        const { category_id ,title, thumbnail, description, price, discount } = req.body;

        if ( !category_id || !title || !thumbnail || !description || !price || !discount ) {
            return res.status(400).json({ message : "POST 데이터 타입을 잘 못 입력했습니다."});
        }

        await productService.products( category_id ,title, thumbnail, description, price, discount );

        res.status(201).json({ message : "상품정보가 성공적으로 입력되었습니다."});
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message : err.message });
    }
};

module.exports = {
    products
}