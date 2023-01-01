const favoriteService = require("../services/favoriteService");
const jwt = require("jsonwebtoken");

const getfavorite = async (req, res) => {
  try {
    const id = req.params;
    if (!id) {
      return res.status(400);
    }
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
  const favorite = await favoriteService.getfavorite(product_id);
  res.status(201).json(favorite);
};

module.exports = {
  getfavorite,
};
