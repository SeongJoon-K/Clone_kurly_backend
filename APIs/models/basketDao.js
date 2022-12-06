const { kurlyDataSource } = require('./dbconfig');

const createBasket = async (user_id, product_id, amount) => {
  return await kurlyDataSource.query(
    `INSERT INTO baskets(
            user_id, 
            product_id, 
            amount
        ) VALUES (?, ?, ?);
        `,
    [user_id, product_id, amount]
  );
};

const getbasket = async (user_id) => {
  const basket = await kurlyDataSource.query(
    `SELECT product_id, amount FROM baskets WHERE user_id=?`,
    user_id
  );
  return basket;
};

const updatebasket = async (user_id, amount) => {
  console.log(user_id, amount);
  const basket = await kurlyDataSource.query(
    `UPDATE baskets SET amount=? WHERE id=?`,
    [amount, user_id]
  );
  return basket;
};

const deletebasket = async (id) => {
  const basket = await kurlyDataSource.query(
    `DELETE FROM baskets WHERE id=${id}`
  );
  return basket;
};

module.exports = {
  createBasket,
  getbasket,
  updatebasket,
  deletebasket,
};
