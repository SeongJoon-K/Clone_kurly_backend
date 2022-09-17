
const categoryId = 1
const minPrice = 123
const maxPrice = 400
// WHERE가 들어가는 조건이 들어갔을 때,
function productCondition(...params) { // 배열 형태로 들어감

  const categoryIdString = ` categoryId=${categoryId}`;
  const minPriceString = ` price >= ${minPrice}`;
  const maxPriceString = ` price <= ${maxPrice}`;
  const productConditionArray = [...params]
  console.log(productConditionArray);

}


productCondition(categoryId, minPrice, maxPrice);
/* 
필요한 조건에 대해서 

  1. 해당 조건이 없는 경우
  조건이 없을 시 함수 미사용함 고려 X

  2. 해당 조건이 하나인 경우 params == 1
  해당 조건이 하나인 경우 WHERE만 쓴다

  3. 해당 조건이 여러개인 경우 params >=  2
  WHERE과 AND 가 있어야함 


*/

// 
function productOrderBy() {
  
}

function productLimit() {
  
}