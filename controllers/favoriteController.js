// 찜목록

const favoriteService = require("../services/favoriteService");
const jwt = require('jsonwebtoken');

const getfavorite = async(req, res) => {
    try {
        const id = req.params;
        if(!id) {
            return res.status(400)
        } 
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message : err.message });
    }
    const favorite = await favoriteService.getfavorite(product_id);
    res.status(201).json(favorite);
}
// 찜목록 
// product_id >> 해당 프로덕트에 가격이랑 할인율 합쳐서 나옴
// user_id JWT 로 인증함

module.exports = {
    getfavorite
}