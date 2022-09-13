const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  try {
    console.log(req.headers.authorization.split(" ")[1]);
    req.decoded = await jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.SECRET_KEY
    );
    console.log(req.decoded);
    return next();
  } catch (err) {
    return res.status(401);
  }
};

module.exports = {
  validateToken,
};
