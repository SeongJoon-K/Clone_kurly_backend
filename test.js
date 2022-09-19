function productQuery {
  categoryIdString() {
    const categoryIdString = ` categoryId=${categoryId}`;

  }
  minPriceString() {
    const minPriceString = ` price >= ${minPrice}`;

  }
  maxPriceString() {
    const maxPriceString = ` price <= ${maxPrice}`;

  }
}

function productPagination {

}

function productOrdering {

}


const defaultQuery = 
`SELECT 
    id,
    categoryId,
    title,
    thumbnail,
    description, 
    price, 
    discount
  FROM products`;
function

productQuery.

const getProductList = async (categoryId, minPrice, maxPrice, order) => {
  const defaultQuery = `SELECT id, categoryId, title, thumbnail, description, price, discount FROM products`;
  const query = [defaultQuery];
  // console.log(defaultQuery, "sadqsdwqdwdqw");


  let fullQuery = "";
  
  
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