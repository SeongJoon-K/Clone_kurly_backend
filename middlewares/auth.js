const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    // 토큰 값을 변수에 넣어서 저장해서 verify 시킨다.
    // const payload
    req.decoded = await jwt.verify(
      req.headers.authorization,
      process.env.SECRET_KEY
    );
    // req.userId = payload.id 여기에 담아야함.
    // req.객체 안에 새로운 속성을 만든거라고 const 필요 없음.

    // console.log(req.decoded); 이거 빼자
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
