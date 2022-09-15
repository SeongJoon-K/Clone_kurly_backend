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
  const query = `
    SELECT 
      id, 
      categoryId, 
      title, 
      thumbnail,
      description, 
      price, 
      discount 
    FROM products`;

  // categoryId is exist
  if (categoryId) {
    // only minPrice exist
    if (minPrice && !maxPrice) {
      const priceQuery = addQuery + ` AND price >= ${minPrice}`;
      console.log("ㅈㅇㅈㅂㅇㅇㅈㅂㅇㅈㅂ");
      const product = await myDataSource.query(priceQuery);

      return product;
    }
    // only maxPrice exist
    if (maxPrice && !minPrice) {
      const priceQuery = addQuery + ` AND price <= ${maxPrice}`;
      const product = await myDataSource.query(priceQuery);
      console.log("105");

      return product;
    }
    // minPrice and maxPrice exist
    if (minPrice && maxPrice) {
      const priceQuery =
        addQuery + ` AND price >= ${minPrice} AND price <= ${maxPrice}`;
      const product = await myDataSource.query(priceQuery);
      console.log("104");

      return product;
    }
    // price boundary null
    const addQuery = query + ` WHERE categoryId=${categoryId}`;
    console.log(query, "q");
    const product = await myDataSource.query(addQuery);

    return product;
  }

  // categoryId is null
  if (!categoryId) {
    if (minPrice && !maxPrice) {
      const priceQuery = query + ` WHERE price >= ${minPrice}`;
      const product = await myDataSource.query(priceQuery);
      console.log("102");

      return product;
    }
    // only maxPrice exist
    if (maxPrice && !minPrice) {
      const priceQuery = query + ` WHERE price <= ${maxPrice}`;
      const product = await myDataSource.query(priceQuery);
      console.log("101");

      return product;
    }
    // minPrice and maxPrice exist
    if (minPrice && maxPrice) {
      const priceQuery =
        query + ` WHERE price >= ${minPrice} AND price <= ${maxPrice}`;
      const product = await myDataSource.query(priceQuery);
      console.log("100");
      return product;
    }
    // categoryId AND price boundary x
    const Query = `SELECT 
  id, 
  categoryId, 
  title, 
  thumbnail,
  description, 
  price, 
  discount 
  FROM products
  ORDER BY price ${order}`;
    const product = await myDataSource.query(Query);
    console.log("둘다 없음");
    return product;
  }
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
