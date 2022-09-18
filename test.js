
const categoryId = 1
const minPrice = 123
// const maxPrice = undefined
// WHERE가 들어가는 조건이 들어갔을 때,
function productCondition(...params) { // 배열 형태로 들어감
  const productConditionArray = [];
  if (categoryId) {
    const categoryIdString = ` categoryId=${categoryId}`;
    productConditionArray.push(categoryId);    
  }
  if (minPrice) {
    const minPriceString = ` price >= ${minPrice}`;
    productConditionArray.push(minPrice);
  }
  if (maxPrice) {
    const maxPriceString = ` price <= ${maxPrice}`;
    productConditionArray.push(maxPrice);
  }
  
  console.log(params,"check");
  // 해당 조건의 값이 정의 되었을 때 push 함
  console.log(productConditionArray);
  // 해당 값이 존재할 때만 배열에 넣어야함.

}
productCondition(categoryId, minPrice);
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