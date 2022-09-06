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


myDataSource.initialize()
  .then(() => {
    console.log("장바구니(baskets) DB 연동 완료");
  })
  .catch((err) => {
    console.error("Error occurred during Data Source initialization", err);
	  myDataSource.destroy();
  });

const createBasket = async ( user_id, product_id, amount ) => {
    try {
        console.log(user_id, product_id, amount)
        return await myDataSource.query(
            `INSERT INTO baskets(
                user_id, 
                product_id, 
                amount
            ) VALUES (?, ?, ?);
            `, 
            [ user_id, product_id, amount ]
        );

    } catch (err) {
        const error = new Error("장바구니 데이터를 잘 못 입력했습니다.")
        error.statusCode = 500;
        throw error;
    }
}

const getbasket = async (user_id) => {
    const basket = await myDataSource.query(
        `SELECT * FROM baskets WHERE user_id=?`,(user_id)
        )
    return basket;
}

module.exports = {
    createBasket,
    getbasket
}