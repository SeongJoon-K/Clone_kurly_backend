const userDao = require('../models/userDao')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signUp = async (login_id, password, name) => {
    if (!password.includes('@')){
      const err = new Error('@ 포함되지 않았습니다.');
      err.statusCode = 409;
      throw err;    
    }
    if (password.length < 10){
      const err = new Error('PW가 짧습니다.');
      err.statusCode = 409;
      throw err;        
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
  console.log(accessToken);
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