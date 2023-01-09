const { kurlyDataSource } = require('./data-source');

const getcategory = async id => {
  const category = await kurlyDataSource.query(`SELECT * FROM categories;`);
  return category;
};
const detailcategory = async id => {
  const category = await kurlyDataSource.query(
    `SELECT name FROM categories WHERE id=${id}`,
  );
  return category;
};

module.exports = {
  getcategory,
  detailcategory,
};
