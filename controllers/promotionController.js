// Service단 연결
const promotionService = require("../services/promotionService");

const promotions = async (req, res) => {
  const promotion = await promotionService.promotions();
  res.status(200).json(promotion);
};

module.exports = {
  promotions,
};
