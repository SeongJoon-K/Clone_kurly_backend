// 1. built-in node modules
// 2. 3rd party module >> npm install 로 받은 것들

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// 3. Project 내에 module(내가 만든 것들)
const userDao = require("../models/userDao");
const COST_FACTOR = 10;

const signUp = async (loginId, password, name) => {
  const PASSWORD_LENGTH = 10;
  if (!password.includes("@")) {
    const err = new Error("@ is not included.");
    err.statusCode = 400;
    throw err;
  }
  if (password.length < PASSWORD_LENGTH) {
    const err = new Error("Password is short");
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
    const accessToken = jwt.sign(
      {
        id: user.loginId,
        name: user.name,
      },
      process.env.SECRET_KEY
    );
    return accessToken;
  }
};

// JWT 토큰 발급
const profile = async () => {
  // const checkToken = jwt.verify(token, process.env.SECRET_KEY)
  const userName = await userDao.profile();
  if (!checkToken) {
    return;
  }
  return userName;
};

module.exports = {
  signUp,
  login,
  profile,
};
