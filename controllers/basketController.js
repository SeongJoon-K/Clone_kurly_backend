// 장바구니 basketsController.js

const baskerService = require('../services/basketService');

const baskets = async (req, res) => {
    try {
        const { user_id, product_id, amount } = req.body;
        if ( !user_id || !product_id || !amount ) {
            return res.status(400).json({ message : "POST 데이터 타입을 잘 못 입력했습니다."});
        }

        await baskerService.baskets( user_id, product_id, amount );
        res.status(201).json({ message : "장바구니 등록 완료되었습니다." });
    } catch (err) {
        console.log(err);
        return res.status(400)
    }
    
}


module.exports = {
    baskets
}