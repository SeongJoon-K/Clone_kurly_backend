// 기존 Query Builder code
function productCondition(categoryId, minPrice, maxPrice) {
  let conditionStr = [" WHERE"];
  const categoryIdString = ` categoryId = ${categoryId}`;
  const minPriceString = ` price >= ${minPrice}`;
  const maxPriceString = ` price <= ${maxPrice}`;
  if (categoryId) {
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
/* 2, 4, 6 
W a A a  
*/
