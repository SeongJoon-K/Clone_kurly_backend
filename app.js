// app.js


// app.js 기본 모듈 설정
const http = require("http");
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const dotenv = require("dotenv")
dotenv.config()

const routes = require("./routes");

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(routes);


// myDataSource TYPEORM 설정 및 database 설정
const { DataSource } = require('typeorm');

const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

// data 추가시 해당 문구 출력
myDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error occurred during Data Source initialization", err);
	  myDataSource.destroy();
  });

// Health Check Code

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});


// 상품(products) 생성 POST API
app.post('/products', async (req, res) => {
	const { category_id ,title, thumbnail, description, price } = req.body
    
	await myDataSource.query(
		`INSERT INTO products(
		    category_id,
		    title,
		    thumbnail,
        description,
        price
		) VALUES (?, ?, ?, ?, ?);
		`,
		[ category_id ,title, thumbnail, description, price ]
	); 
     res.status(201).json({ message : "successfully created" });
	})

// 상품(products) 조회 GET API
app.get('/products', async(req, res) => {
    await myDataSource.query(
	`SELECT 
            products.category_id,
            products.title,
            products.thumbnail,
            products.description,
            products.price
		FROM products`
		,(err, rows) => {
      res.status(200).json(rows);
	});
});

// 상품(products) 수정 PUT API

app.put('/products', async(req, res) => {
	const { category_id ,title, thumbnail, description, price } = req.body
    
	await myDataSource.query(
		`UPDATE products 
      SET 
        category_id = ?,
		    title = ?,
		    thumbnail = ?,
        description = ?,
        price = ?
		`,
		[ category_id ,title, thumbnail, description, price ]
	); 
      res.status(201).json({ message : "successfully updated" });
	});
  

// 상품(products) 삭제 DELETE API
app.delete('/products/:productId', async(req, res) => {
	const { productId } = req.params;

    await myDataSource.query(
		`DELETE FROM products
		WHERE products.id = ${productId}
		`); 
     res.status(204).json({ message : "successfully deleted" });
	});


  //
  // Health Check Code

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});


// 고객문의(vocs) 생성 POST API
app.post('/vocs', async (req, res) => {
    const { user_id , product_id ,title, content } = req.body
    
    await myDataSource.query(
        `INSERT INTO vocs(
          user_id,
          product_id,
          title,
          content
        ) VALUES (?, ?, ?, ?);
        `,
        [ user_id , product_id ,title, content ]
    ); 
     res.status(201).json({ message : "successfully created" });
    })

// 고객문의(vocs) 조회 GET API
app.get('/vocs', async(req, res) => {
    await myDataSource.query(
    `SELECT 
            vocs.user_id,
            vocs.product_id,
            vocs.title,
            vocs.content
        FROM vocs`
        ,(err, rows) => {
      res.status(200).json(rows);
    });
});

// 고객문의(vocs) 수정 PUT API

app.put('/vocs', async(req, res) => {
    const { user_id , product_id ,title, content } = req.body
    
    await myDataSource.query(
        `UPDATE vocs 
      SET 
        user_id = ?,
        product_id = ?,
        title = ?,
        content = ?
        `,
        [ user_id ,product_id ,title, content ]
    ); 
      res.status(201).json({ message : "successfully updated" });
    });
  

// 고객문의(vocs) 삭제 DELETE API
app.delete('/vocs/:vocsId', async(req, res) => {
    const { vocsId } = req.params;

    await myDataSource.query(
        `DELETE FROM vocs
        WHERE vocs.id = ${vocsId}
        `); 
     res.status(204).json({ message : "successfully deleted" });
    });




  //


const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
  try {
    server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

start();