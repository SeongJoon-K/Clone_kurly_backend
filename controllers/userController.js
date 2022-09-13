const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const signUp = async (req, res) => {
  try {
    const { loginId, password, name } = req.body;
    console.log(loginId)
    if ( !loginId || !password || !name) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }
    const signupPost = await userService.signUp( loginId, password, name );
    res.status(201).json(
      signupPost
    );
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};


const login = async (req, res) => {
  const { loginId, password } = req.body;
  if( !loginId || !password ) {
    return res.status(400);
  }
  // 로그인 요청에서 받은 password를 hashPw 로 바꿔서 service로 보냄
  const accessToken = await userService.login(loginId, password);
  if (!accessToken) {
    return res.status(400);
  }
  res.status(200).json(accessToken);
};

const profile = async (req, res) => {
  // if (!decoded) {
  //   res.status(400);
  //   return;
  // }
  res.status(200).json(decoded);
}

module.exports = {
	signUp,
  login,
  profile
}