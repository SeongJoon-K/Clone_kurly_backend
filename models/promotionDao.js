const { myDataSource } = require("../dbconfig.js");

const promotions = async (id) => {
  const promotion = await myDataSource.query(`SELECT * FROM promotions;`);
  return promotion;
};

module.exports = {
  promotions,
};
