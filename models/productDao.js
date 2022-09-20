const { SimpleConsoleLogger } = require("typeorm");
const { myDataSource } = require("../dbconfig.js");

function productCondition(categoryId, minPrice, maxPrice) {
  let conditionArr = [];
  const categoryIdString = ` categoryId = ${categoryId}`;
  const minPriceString = ` price >= ${minPrice}`;
  const maxPriceString = ` price <= ${maxPrice}`;
  if (categoryId) {
    conditionArr.push(categoryIdString);
  }
  if (minPrice) {
    conditionArr.push(minPriceString);
  }
  if (maxPrice) {
    conditionArr.push(maxPriceString);
  }
  const arrRange = conditionArr.length * 2;
  if (conditionArr.length === 1) {
    conditionArr.splice(0, 0, ` WHERE`);
  } else if (conditionArr.length >= 2) {
    conditionArr[0] = ` WHERE`;
    for (let i = 2; i < arrRange; i += 2) {
      conditionArr.splice(i, 0, ` AND`);
    }
  }
  const whereStr = conditionArr.join("");
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

function productLimit(limit, page) {
  const pageStr = ` LIMIT ${limit} OFFSET ${(page - 1) * limit}`;
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

const getProductList = async (
  categoryId,
  minPrice,
  maxPrice,
  order,
  limit,
  page
) => {
  let defaultQuery = `SELECT id, categoryId, title, thumbnail, description, price, discount FROM products`;
  let fullQuery =
    defaultQuery +
    productCondition(categoryId, minPrice, maxPrice) +
    productOrder(order) +
    productLimit(limit, page) +
    ";";
  console.log(fullQuery);
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
