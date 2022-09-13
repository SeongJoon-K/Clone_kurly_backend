const userDao = require('../models/userDao');
const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
    try {
       req.decoded = jwt.verify(req.headers.authorization, process.env.SECRET_KEY)
	    return next();
    } catch (err) {
        res.status(419).json({ 
            code: 419,
            message: "토큰이 만료되었습니다."
        })
    }
    return res.status(401).json({message : "유효하지 않은 토큰"})
};

module.exports = {
    validateToken
}