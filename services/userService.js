const userDao = require('../models/userDao')
const jwt = require('jsonwebtoken');
const e = require('express');

exports.verifyToken = (req, res, next) => {
  // 인증 완료
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
    return next();
  }
  
  // 인증 실패 
  catch(error) {
    if (error.name === 'TokenExpireError') {
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다.'
      });
    }
   return res.status(401).json({
     code: 401,
     message: '유효하지 않은 토큰입니다.'
   });
  }
}

const signUp = async (login_id, password, name, email, phone) => {
    // password validation using REGEX
    const pwValidation = new RegExp(
      '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
    );
    if (!pwValidation.test(password)) {
      const err = new Error('PASSWORD_IS_NOT_VALID');
      err.statusCode = 409;
      throw err;
    }
      const createUser = await userDao.createUser(
        login_id,
        password,
        name,
        email,
        phone
        );
      
        return createUser;
      };

const login = async (login_id, password) => {
  const user = await userDao.login(login_id, password);
  if (user.password === password) {
    const accessToken = jwt.sign(
      user,
      process.env.SECRET_KEY, 
      {expiresIn: '1d'},
  );
    return accessToken;
  } else {
    return null;
  }

}
const check = async(id) => {
  const check = await userDao.check(id);
  return check;
}
  
  module.exports = {
      signUp,
      login,
      check
  }