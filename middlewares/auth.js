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