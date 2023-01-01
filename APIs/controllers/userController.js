const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userService = require('../services/userService');
const { catchAsync } = require('../middlewares/error');

const signUp = catchAsync(async (req, res) => {
  try {
    const { loginId, password, name } = req.body;
    if (!loginId || !password || !name) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }
    const signupPost = await userService.signUp(loginId, password, name);
    res.status(201).json({ message: 'Created Successful ' });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
});

const startKakao = (req, res) => {
  const baseUrl = process.env.KAKAO_BASE_URL;
  const config = {
    client_id: process.env.KAKAO_CLIENT_ID,
    redirect_uri: process.env.KAKAO_REDIRECT_URI,
    response_type: 'code',
  };
  const params = new URLSearchParams(config).toString();

  const finalUrl = `${baseUrl}?${params}`;
  console.log(finalUrl);
  return res.redirect(finalUrl);
};

const finishKakao = async (req, res) => {
  const baseUrl = 'https://kauth.kakao.com/oauth/token';
  const config = {
    client_id: '4e4e9b6459b97ee7e4666f357bbfb85c',
    client_secret: 'rbxHtMaLFfb0NJS5KCP78O6IEBDQrVG7',
    grant_type: 'authorization_code',
    redirect_uri: 'http://127.0.0.1:3000/kakao/finish',
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const kakaoTokenRequest = await fetch(finalUrl, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json', // 이 부분을 명시하지않으면 text로 응답을 받게됨
    },
  });
  const json = await kakaoTokenRequest.json();
  console.log(json);
  res.send(JSON.stringify(json)); // 프론트엔드에서 확인하려고
};

const login = async (req, res) => {
  const { loginId, password } = req.body;
  if (!loginId || !password) {
    return res.status(400).json({ message: 'ID or PW IS UNDEFINED' });
  }
  const accessToken = await userService.login(loginId, password);
  if (!accessToken) {
    return res.status(400).json({ message: 'JWT IS UNDEFINED' });
  }
  res.status(200).json(accessToken);
};

const profile = async (req, res) => {
  const getProfile = await userService.profile(req.userId);
  res.status(200).json(getProfile);
};

module.exports = {
  signUp,
  login,
  profile,
  startKakao,
  finishKakao,
};
