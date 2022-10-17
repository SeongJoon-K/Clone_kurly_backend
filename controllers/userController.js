const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userService = require("../services/userService");

const signUp = async (req, res) => {
  try {
    const { loginId, password, name } = req.body;
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

const startKakao = async (req, res) => {
  const hostUrl = "http://kauth.kakao.com";
  const config = {
    client_id: process.env.KAKAO_RESTAPI,
    redirect_url: process.env.KAKAO_REDIRECT,
    response_type: "code",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${hostUrl}?${params}`;
  console.log(finalUrl);
  return res.redirect(finalUrl);
};

const finishKakao = async (req, res) => {
  const hostUrl = "https://kauth.kakao.com/oauth/token";
  const config = {
    client_id: process.env.KAKAO_RESTAPI,
    client_secret: process.env.KAKAO_SECRET,
    grant_type: "authorization_code",
    redirect_url: "http://127.0.0.1:3000/kakao/finish",
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${hostUrl}?${params}`;
  const kakaoTokenReq = await fetch(finalUrl, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });
  const json = await kakaoTokenReq.json();
  console.log(json);
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
