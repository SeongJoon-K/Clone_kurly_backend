const userDao = require('../models/userDao')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signUp = async (login_id, password, name) => {
    // password validation using REGEX

    const pwValidation = new RegExp(
      '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
    );
    if (!pwValidation.test(password)) {
      const err = new Error('PASSWORD_IS_NOT_VALID');
      err.statusCode = 409;
      throw err;
    }
    if (!password.includes('@')){
      return new Error("@ 가 포함되지 않았습니다.")
    }

    if (password.length < 10){
      return new Error("비밀번호 길이가 짧습니다.")
    }
      const createUser = await userDao.createUser(
        login_id,
        password,
        name
        );
        return createUser;
      };



// 로그인 POST API JWT 인증
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

// const check = async(id) => {
//   const check = await userDao.check(id);
//   return check;
// }
  
  module.exports = {
      signUp,
      login,

  }