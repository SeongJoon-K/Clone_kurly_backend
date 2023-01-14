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
  const hashedPassword = await bcrypt.hash(password, COST_FACTOR);
  const createUser = await userDao.createUser(loginId, hashedPassword, name);
  return createUser;
};

const login = async (loginId, password) => {
  const user = await userDao.login(loginId);
  const compareResult = bcrypt.compare(password, user[0].password)
  if (compareResult) {
    const payload = user[0].id;
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY);
    return accessToken;
  }
  if (!loginId || !password) {
    return res.status(400).json({ message: "ID_OR_PW_UNDEFINED" });
  }
};

const profile = async (userId) => {
  const userName = await userDao.profile(userId);
  if (!userName) {
    return res.status(400).json({ message: "USERNAME_IS_UNDEFINED" });
  }
  return userName;
};

module.exports = {
  signUp,
  login,
  profile,
};
