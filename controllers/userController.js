const userService = require('../services/userService');

const signUp = async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body;

    if ( !name || !email || !password || !profileImage ) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    await userService.signUp( name, email, password, profileImage );
    return res.status(201).json({
      message: 'SIGNUP_SUCCESS',
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const products = async (req, res) => {
  try {
    const { category_id ,title, thumbnail, description, price } = req.body;

    if ( !category_id || !title || !thumbnail || !description || !price ) {
      return res.status(400).json({ message: 'KEY_ERROR'});
    }

    await userService.products( category_id ,title, thumbnail, description, price );
    return res.status(201).json({
      message: 'product create success',
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

module.exports = {
	signUp,
  products
}