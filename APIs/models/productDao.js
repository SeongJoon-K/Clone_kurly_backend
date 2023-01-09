const { kurlyDataSource } = require('./data-source');

function productOrder(order) {
  const orderByStr = ``;
  if (order) {
    orderByStr = ` ORDER BY price ${order}`;
  }
  return orderByStr;
}

function productLimit(limit, page) {
  if (!limit && !page) return '';

  const pageStr = ` LIMIT ${limit} OFFSET ${(page - 1) * limit}`;
  return pageStr;
}

const createProduct = async (
  categoryId,
  title,
  thumbnail,
  description,
  price,
  discount,
) => {
  return await kurlyDataSource.query(
    `INSERT INTO products(
                categoryId,
                title,
                thumbnail,
                description,
                price,
                discount
            ) VALUES (?, ?, ?, ?, ?, ?);
            `,
    [categoryId, title, thumbnail, description, price, discount],
  );
};

function productCondition(categoryId, minPrice, maxPrice) {
  if (!categoryId && !minPrice && !maxPrice) return '';

  const conditionArr = [];
  if (categoryId) {
    conditionArr.push(` categoryId = ${categoryId}`);
  }
  if (minPrice) {
    conditionArr.push(` price >= ${minPrice}`);
  }
  if (maxPrice) {
    conditionArr.push(` price <= ${maxPrice}`);
  }

  return 'WHERE' + conditionArr.join(' AND');
}

const getProductList = async (
  categoryId,
  minPrice,
  maxPrice,
  order,
  limit,
  page,
) => {
  let defaultQuery = `SELECT id, categoryId, title, thumbnail, description, price, discount FROM products`;
  let fullQuery =
    defaultQuery +
    productCondition(categoryId, minPrice, maxPrice) +
    productOrder(order) +
    productLimit(limit, page) +
    ';';
  console.log(fullQuery);
  const product = await kurlyDataSource.query(fullQuery);
  return product;
};

const getProduct = async id => {
  console.log(id);
  const product = await kurlyDataSource.query(
    `SELECT * FROM products WHERE id=?;`,
    id,
  );
  return product[0];
};

module.exports = {
  createProduct,
  getProductList,
  getProduct,
};
