const userDao = require('../models/userDao')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signUp = async (login_id, password, name) => {
    if (!password.includes('@')){
      const err = new Error('@ 포함되지 않았습니다.');
      err.statusCode = 400;
      throw err;    
    }
    if (password.length < 10){
      const err = new Error('PW가 짧습니다.');
      err.statusCode = 400;
      throw err;        
    }
  
    const hashPw = await bcrypt.hash(password, 8); // Bcrypt 암호화
      const createUser = await userDao.createUser(
        login_id,
        hashPw, 
        name
        );
        return createUser;
};



// 로그인 POST API JWT 인증
const login = async (login_id, password) => {
  // const hashPw = await bcrypt.hash(password, 8);
  const user = await userDao.login(login_id, password);
  if (bcrypt.compare(password, user.password)) {
    const accessToken = jwt.sign(
      {
        id: user.id,
      name: user.name
      },
      process.env.SECRET_KEY);
    console.log(accessToken);
    return accessToken;
  } 
}
  // if (user.password === password) {
  //   const accessToken = jwt.sign(
  //     user,
  //     process.env.SECRET_KEY, 
  //     {expiresIn: '1d'},
  // );

// JWT 토큰 발급
const profile = async(token) => {
  const checkToken = jwt.verify(token, process.env.SECRET_KEY)
  // const userName = await userDao.profile(token);
  if (!checkToken) {
    return;
  }
  return checkToken;  
}
  
module.exports = {
  signUp,
  login,
  profile
}