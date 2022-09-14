// 1. built-in node modules
// 2. 3rd party module >> npm install 로 받은 것들
// 3. Project 내에 module(내가 만든 것들)

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userDao = require("../models/userDao");
const COST_FACTOR = 10;

const signUp = async (loginId, password, name) => {
  const PASSWORD_LENGTH = 10;
  if (!password.includes("@") || password.length < PASSWORD_LENGTH) {
    const err = new Error("PASSWORD IS NOT VALID");
    err.statusCode = 400;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(password, COST_FACTOR); // Bcrypt 암호화
  const createUser = await userDao.createUser(loginId, hashedPassword, name);
  return createUser;
};

// 로그인 POST API JWT 인증
const login = async (loginId, password) => {
  const user = await userDao.login(loginId);
  if (bcrypt.compare(password, user[0].password)) {
    const payload = user[0].id;
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY);
    return accessToken;
  }
  if (!loginId || !password) {
    return res.status(400).json({ message: "ID or PW IS UNDEFINED" });
  }
};

// 프론트에서 JWT 토큰 입력시 해당유저의 name 출력
const profile = async (userId) => {
  const userName = await userDao.profile(userId);
  if (!userName) {
    return res.status(400).json({ message: "PK IS UNDEFINED" });
  }
  return userName;
};

module.exports = {
  signUp,
  login,
  profile,
};
