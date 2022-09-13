const db = require('../db');



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

const getproduct = async () => {
    const product = await myDataSource.query(
        `SELECT * FROM products`)
    return product
}

const detailproduct = async(id) => {
    console.log(id);
    const product = await myDataSource.query(
        `SELECT * FROM products WHERE id=?;`,(id))
    return product[0]; // RowDataPocket이 []로 감싸져 있어서 [0] 추가하였음
}

module.exports = {
    createProduct,
    getproduct,
    detailproduct
}