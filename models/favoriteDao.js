// myDataSource TYPEORM 설정 및 database 설정
const { DataSource } = require('typeorm'); // typeorm 설정

// RDBMS 연동 mysql 설정
const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

// initialize를 통한 초기화 이후 서버가 정상적으로 DB 연동 될 시 console 내용 출력됨
myDataSource.initialize()
  .then(() => {
    console.log("찜목록(favorite) DB 연동 완료");
  })
  .catch((err) => {
    console.error("Error occurred during Data Source initialization", err);
	  myDataSource.destroy();
  });


const getfavorite = async(product_id, user_id, discount, price) => {
  const favorite = await myDataSource.query(
  // `SELECT product_id, amount FROM baskets WHERE user_id=?`,(user_id)
        )
    return favorite;
}

module.exports = {
  getfavorite
}