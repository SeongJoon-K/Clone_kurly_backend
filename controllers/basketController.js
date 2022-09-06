// 장바구니 basketsController.js
const basketService = require('../services/basketService');

const baskets = async (req, res) => {
    try {
        const { user_id, product_id, amount } = req.body;
        if ( !user_id || !product_id || !amount ) {
            return res.status(400).json({ message : "POST 데이터 타입을 잘 못 입력했습니다."});
        }

        await basketService.baskets( user_id, product_id, amount );
        res.status(201).json({ message : "장바구니 등록 완료되었습니다." });
    } catch (err) {
        console.log(err);
        return res.status(400)
    }
}

const getbasket = async(req, res) => {
    try {
        const userId = req.params.user_id;
        console.log(userId);
        if (!userId) {
            return res.status(400).json({ message : "USER_ID IS NULL"});
        }
        const basket = await basketService.getbasket( userId );
        res.status(200).json(
            basket
        ) 
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message : err.message });
    }
}


module.exports = {
    baskets,
    getbasket
}