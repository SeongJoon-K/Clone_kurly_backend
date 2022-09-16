const defaultQuery = `SELECT id, categoryId, title, thumbnail, description, price, discount FROM products`;
const query = [defaultQuery];

// 빌더로
if (categoryId) {
  const categoryIdString = ` categoryId=${categoryId}`;
  query.push(categoryIdString);
}
if (minPrice) {
  const minPriceString = ` price >= ${minPrice}`;
  query.push(minPriceString);
}
if (maxPrice) {
  const maxPriceString = ` price <= ${maxPrice}`;
  query.push(maxPriceString);
}
if (order) {
  const orderBy = ` ORDER BY ${order}`;
  query.push(orderBy);
}

let fullQuery = defaultQuery;
if (query.length === 2) {
  // order 만 포함됐을 시
  if (query[1] === order) {
    for (let i = 1; i < query.length; i++) {
      fullQuery += query[i];
    }
    return fullQuery;
  }
  // 조건만 포함시
  fullQuery += ` WHERE`;
  if (query[1] !== order) {
    fullQuery += query[i];
    return fullQuery;
  }
}
