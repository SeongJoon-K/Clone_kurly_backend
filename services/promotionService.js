const promotionDao = require("../models/promotionDao");

const promotions = async () => {
  const promotion = await promotionDao.promotions();
  return promotion;
};

module.exports = {
  promotions,
};
