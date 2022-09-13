const db = require('../db');



const getfavorite = async(product_id, user_id, discount, price) => {
  const favorite = await myDataSource.query(
  // `SELECT product_id, amount FROM baskets WHERE user_id=?`,(user_id)
        )
    return favorite;
}

module.exports = {
  getfavorite
}