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
    console.log("상품정보(product) DB 연동 완료");
  })
  .catch((err) => {
    console.error("Error occurred during Data Source initialization", err);
	  myDataSource.destroy();
  });


const createProduct = async ( category_id ,title, thumbnail, description, price, discount ) => {
    try {
        return await myDataSource.query(
            `INSERT INTO products(
                category_id,
                title,
                thumbnail,
                description,
                price,
                discount
            ) VALUES (?, ?, ?, ?, ?, ?);
            `,
            [ category_id ,title, thumbnail, description, price, discount ]
        );
    } catch (err) {
        const error = new Error('허용되지 않는 데이터 입력');
        error.statusCode = 500;
        throw error;
    }
}

const getproduct = async (id) => {
    const product = await myDataSource.query(
        `SELECT * FROM products
        WHERE id=?;`,(id))

        console.log(product);
    return product
}

module.exports = {
    createProduct,
    getproduct
}