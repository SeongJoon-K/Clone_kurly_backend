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
    console.log("배너(promotions) DB 연동 완료");
  })
  .catch((err) => {
    console.error("배너 DB 연결 에러", err);
	  myDataSource.destroy();
  });

const promotions = async(id) => {
    console.log("여기오나?", id)
    const promotion = await myDataSource.query(
        `SELECT * FROM promotions;`   
    );
    return promotion;
}

module.exports = {
    promotions
}