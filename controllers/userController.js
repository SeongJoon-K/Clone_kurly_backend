const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "JwTsEcReTkEyOrHaShInG";

const signUp = async (req, res) => {
  try {
    const { login_id, password, name, email, phone } = req.body;

    if ( !login_id || !password || !name || !email || !phone ) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    await userService.signUp( login_id, password, name, email, phone );
    return res.status(201).json({
      message: 'SIGNUP_SUCCESS',
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const login = async (req, res, next) => {
  try {
    const { login_id, password } = req.body;
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

const check =  (req, res) => {
  res.json(req.decoded);
};

module.exports = {
	signUp,
  login,
  check
}