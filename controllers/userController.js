const userService = require('../services/userService');

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


module.exports = {
	signUp,
}