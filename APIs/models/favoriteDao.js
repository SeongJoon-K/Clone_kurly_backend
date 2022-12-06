const { kurlyDataSource } = require('./dbconfig');

const getfavorite = async (product_id, user_id, discount, price) => {
  const favorite = await kurlyDataSource.query(
    `SELECT product_id, amount FROM baskets WHERE user_id=?`,
    [user_id]
  );
  return favorite;
};

module.exports = {
  getfavorite,
};
