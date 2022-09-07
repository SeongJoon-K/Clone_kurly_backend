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
    return res.status(201).json({
      message: 'SIGNUP_SUCCESS',
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const saltRounds = 8;

const login = async (req, res, next) => {
  try {
    const { login_id, password } = req.body;
    // Bcrypt 암호화
    console.log("userController 암호화 시작")
    const makeHash = async (password, saltRounds) => {
      return await bcrypt.hash(password, saltRounds);
    }
    const main = async () => {
      const hashedPassword = await makeHash(password, saltRounds);
      console.log(hashedPassword)
    }
    const hashPw = main();
    // console.log(hashPw)

    // Bcrypt 검증
    // const checkHash = async (password, hashedPassword) => {
    //   return await bcrypt.compare(password, hashedPassword);
    // }
    // const main = async () => {
    //   const hashedPassword = await makeHash(password, 12);
    //   const result = await checkHash(password, hashedPassword);
    //   console.log(result);
    // }
    // id or pw 없거나, 불일치시 에러 출력함
    if( !login_id || !password ) {
      return res.status(400).json({ message : "Idpw error"});
    }
    const accessToken = await userService.login(login_id, password);
    if (accessToken === null) {
      return res.status(400)
    } else {
      res.status(200).json({
        accessToken
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

// const check =  (req, res) => {
//   res.json(req.decoded);
// };

module.exports = {
	signUp,
  login,
}