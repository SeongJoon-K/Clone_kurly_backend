const { SimpleConsoleLogger } = require("typeorm");
const { myDataSource } = require("../dbconfig.js");

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

const getProductList = async (categoryId, minPrice, maxPrice, order) => {
  const defaultQuery = `SELECT id, categoryId, title, thumbnail, description, price, discount FROM products`;
  const query = [defaultQuery];
  // console.log(defaultQuery, "sadqsdwqdwdqw");

  const categoryIdString = ` categoryId=${categoryId}`;
  const minPriceString = ` price >= ${minPrice}`;
  const maxPriceString = ` price <= ${maxPrice}`;
  const orderBy = ` ORDER BY price ${order}`;
  let fullQuery = "";
  if (categoryId) {
    query.push(categoryIdString);
  }
  if (minPrice) {
    query.push(minPriceString);
  }
  if (maxPrice) {
    query.push(maxPriceString);
  }
  if (order) {
    query.push(orderBy);
  }

  if (query.length === 2) {
    // order 만 포함됐을 시
    if (query[1] === orderBy) {
      fullQuery = query.concat("");
      fullQuery = fullQuery.join("");
      console.log(fullQuery);
    }

    // 조건만 포함시
    if (query[1] !== orderBy) {
      query.splice(1, 0, ` WHERE`);
      fullQuery = query.join(""); // join 할때 아무것도 없어야함.
      console.log(fullQuery);
    }
  }
  if (query.length === 3) {
    //order 포함시
    if (query[2] === orderBy) {
      query.splice(1, 0, ` WHERE`); // 늘어났으니 길이 4
      fullQuery = query.join("");
      console.log(fullQuery);
    }
    // order 없을 시
    if (query[2] !== orderBy) {
      query.splice(1, 0, ` WHERE`); // 늘어났으니 길이 4
      query.splice(3, 0, ` AND`); // 늘어났으니 길이 5
      fullQuery = query.join("");
      console.log(fullQuery);
    }
  }
  if (query.length === 4) {
    // order 포함시 WHERE 한번 AND 한번 2,1
    if (query[3] === orderBy) {
      console.log("1");
      query.splice(1, 0, ` WHERE`); // 늘어났으니 길이 5
      query.splice(3, 0, ` AND`); // 늘어났으니 길이 6
      fullQuery = query.join("");
      console.log(fullQuery);
    }
    if (query[3] !== orderBy && query.length === 4) {
      // order 미포함 WHERE AND AND
      console.log("2");
      query.splice(1, 0, ` WHERE`); // 늘어났으니 길이 5
      query.splice(3, 0, ` AND`); // 늘어났으니 길이 6
      query.splice(5, 0, ` AND`); // 늘어났으니 길이 7
      fullQuery = query.join("");
      console.log(fullQuery);
    }
  }
  if (query.length === 5) {
    query.splice(1, 0, ` WHERE`); // 늘어났으니 길이 6
    query.splice(3, 0, ` AND`); // 늘어났으니 길이 7
    query.splice(5, 0, ` AND`); // 늘어났으니 길이 8
    fullQuery = query.join("");
    console.log(fullQuery);
  }

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

/*
  1
  category, min, max 하나 일때  >> 앞에 WHERE 
  order만 있으면 그냥 씀 
  2
  포함 조건만 두개 일때 >> 2 앞에 WHERE 뒤에는 AND
  조건 하나 order 하나인 경우 >> WHERE 하나 만
  */
// string 배열 조건 생각해라
// Join , 하면 띄어쓰기 된다 조건 생각해라.

// categoryId is exist
// if (categoryId) {
//   // only minPrice exist
//   const addQuery = query + ` WHERE categoryId=${categoryId}`;
//   if (minPrice && !maxPrice) {
//     const priceQuery = addQuery + ` AND price >= ${minPrice}`;
//     const product = await myDataSource.query(priceQuery);
//     return product;
//   }
//   // only maxPrice exist
//   if (maxPrice && !minPrice) {
//     const priceQuery = addQuery + ` AND price <= ${maxPrice}`;
//     const product = await myDataSource.query(priceQuery);

//     return product;
//   }
//   // minPrice and maxPrice exist
//   if (minPrice && maxPrice) {
//     const priceQuery =
//       addQuery + ` AND price >= ${minPrice} AND price <= ${maxPrice}`;
//     const product = await myDataSource.query(priceQuery);
//     return product;
//   }
//   // price boundary null
//   const product = await myDataSource.query(addQuery);
//   return product;
// }

// categoryId is null
// if (!categoryId) {
//   if (minPrice && !maxPrice) {
//     const priceQuery = query + ` WHERE price >= ${minPrice}`;
//     const product = await myDataSource.query(priceQuery);
//     return product;
//   }
//   // only maxPrice exist
//   if (maxPrice && !minPrice) {
//     const priceQuery = query + ` WHERE price <= ${maxPrice}`;
//     const product = await myDataSource.query(priceQuery);
//     return product;
//   }
//   // minPrice and maxPrice exist
//   if (minPrice && maxPrice) {
//     const priceQuery =
//       query + ` WHERE price >= ${minPrice} AND price <= ${maxPrice}`;
//     const product = await myDataSource.query(priceQuery);
//     return product;
//   }
// categoryId AND price boundary x
