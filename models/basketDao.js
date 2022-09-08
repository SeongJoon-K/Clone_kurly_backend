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
    return await myDataSource.query(
        `INSERT INTO baskets(
            user_id, 
            product_id, 
            amount
        ) VALUES (?, ?, ?);
        `, 
        [ user_id, product_id, amount ]
    );
}

const getbasket = async (user_id) => {
    const basket = await myDataSource.query(
        `SELECT product_id, amount FROM baskets WHERE user_id=?`,(user_id)
        )
    return basket;
}

const updatebasket = async (id,amount) => {
    console.log(id, amount)
    const basket = await myDataSource.query(
        `UPDATE baskets SET amount=? WHERE id=?`,
        [amount, id]
        );
    return basket;
}

const deletebasket = async (id) => {
    const basket = await myDataSource.query(
        `DELETE FROM baskets WHERE id=${id}`
    );
    return basket;
    // res.status(204).json({ message: "데이터 삭제 완료;"})
}


module.exports = {
    createBasket,
    getbasket,
    updatebasket,
    deletebasket
}
