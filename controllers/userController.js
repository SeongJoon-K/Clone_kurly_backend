const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "JwTsEcReTkEyOrHaShInG";
const bcrypt = require('bcrypt');


const signUp = async (req, res) => {
  try {
    const { login_id, password, name } = req.body;

    if ( !login_id || !password || !name) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }
    await userService.signUp( login_id, password, name );
    return res.status(201);
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};


const login = async (req, res) => {
  const { login_id, password } = req.body;
  if( !login_id || !password ) {
    return res.status(400);
  }
  // 로그인 요청에서 받은 password를 hashPw 로 바꿔서 service로 보냄
  const accessToken = await userService.login(login_id, password);
  if (!accessToken) {
    return res.status(400);
  }
  res.status(200).json(accessToken);
};

const profile = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = await userService.profile(token);
  if (!decoded) {
    res.status(400);
    return;
  }
  res.status(200).json(decoded);
}

module.exports = {
	signUp,
  login,
  profile
}