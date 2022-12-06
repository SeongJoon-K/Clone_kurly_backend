const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    req.decoded = await jwt.verify(token, process.env.SECRET_KEY);
    req.userId = req.decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "TOKEN IS NOT VALID" });
  }
};

module.exports = {
  validateToken,
};

/*
return next()하면 다음이 아니라 끝나고 안갈 수도 있어서
그냥 next()를 쓰는게 맞다*/
