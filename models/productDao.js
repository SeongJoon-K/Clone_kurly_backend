const { SimpleConsoleLogger } = require("typeorm");
const { myDataSource } = require("../dbconfig.js");

function productCondition(categoryId, minPrice, maxPrice) {
  let conditionStr = [" WHERE"];
  const categoryIdString = ` categoryId=${categoryId}`;
  const minPriceString = ` price >= ${minPrice}`;
  const maxPriceString = ` price <= ${maxPrice}`;
  if (categoryId && conditionStr.length === 1) {
    conditionStr.push(categoryIdString);
  } else if (categoryId && conditionStr.length !== 1) {
    conditionStr.push(` AND`);
    conditionStr.push(categoryIdString);
  }
  if (minPrice && conditionStr.length === 1) {
    conditionStr.push(minPriceString);
  } else if (minPrice && conditionStr.length !== 1) {
    conditionStr.push(` AND`);
    conditionStr.push(minPriceString);
  }
  if (maxPrice && conditionStr.length === 1) {
    conditionStr.push(maxPriceString);
  } else if (maxPrice && conditionStr.length !== 1) {
    conditionStr.push(` AND`);
    conditionStr.push(maxPriceString);
  }
  const whereStr = conditionStr.join("");
  return whereStr;
}

function productOrder(order) {
  let orderByStr = ` ORDER BY price`;
  if (order) {
    orderByStr = ` ORDER BY price ${order}`;
  }
  return orderByStr;
}
//

function productLimit(page) {
  const pageStr = ` LIMIT 6 OFFSET ${(page - 1) * 6}`;
  if (page) {
    return pageStr;
  }
}
// page2 일떄,

// LIMIT 6 OFFSET
const createProduct = async (
  categoryId,
  title,
  thumbnail,
  description,
  price,
  discount
) => {
  try {
    return await myDataSource.query(
      `INSERT INTO products(
                categoryId,
                title,
                thumbnail,
                description,
                price,
                discount
            ) VALUES (?, ?, ?, ?, ?, ?);
            `,
      [categoryId, title, thumbnail, description, price, discount]
    );
  } catch (err) {
    const error = new Error("허용되지 않는 데이터 입력");
    error.statusCode = 500;
    throw error;
  }
};

const getProductList = async (categoryId, minPrice, maxPrice, order, page) => {
  let defaultQuery = `SELECT id, categoryId, title, thumbnail, description, price, discount FROM products`;
  const query = [defaultQuery];
  // productCondition(categoryId, minPrice, maxPrice);
  // productOrder(order);

  // console.log(defaultQuery);
  // console.log(productLimit(page));
  // console.log(productCondition(categoryId, minPrice, maxPrice), "das");
  // console.log(productOrder(order), "dsdqwdq");
  const fullQuery =
    defaultQuery +
    productLimit(page) +
    productCondition(categoryId, minPrice, maxPrice) +
    productOrder(order);

  const product = await myDataSource.query(fullQuery);
  return product;
};

const getProduct = async (id) => {
  console.log(id);
  const product = await myDataSource.query(
    `SELECT * FROM products WHERE id=?;`,
    id
  );
  return product[0]; // RowDataPocket이 []로 감싸져 있어서 [0] 추가하였음
};

module.exports = {
  createProduct,
  getProductList,
  getProduct,
};
