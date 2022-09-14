const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userService = require("../services/userService");

const signUp = async (req, res) => {
  try {
    const { loginId, password, name } = req.body;
    console.log(loginId);
    if (!loginId || !password || !name) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    const signupPost = await userService.signUp(loginId, password, name);
    res.status(201).json({ message: "Created Successful " });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { loginId, password } = req.body;
  if (!loginId || !password) {
    return res.status(400).json({ message: "ID or PW IS UNDEFINED" });
  }
  // 로그인 요청에서 받은 password를 hashPw 로 바꿔서 service로 보냄
  const accessToken = await userService.login(loginId, password);
  if (!accessToken) {
    return res.status(400).json({ message: "JWT IS UNDEFINED" });
  }
  res.status(200).json(accessToken);
};

const profile = async (req, res) => {
  res.status(200).json(req.decoded);
};

module.exports = {
  signUp,
  login,
  profile,
};
