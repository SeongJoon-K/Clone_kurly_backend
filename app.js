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
// const { DataSource } = require('typeorm');

// const myDataSource = new DataSource({
//     type: process.env.TYPEORM_CONNECTION,
//     host: process.env.TYPEORM_HOST,
//     port: process.env.TYPEORM_PORT,
//     username: process.env.TYPEORM_USERNAME,
//     password: process.env.TYPEORM_PASSWORD,
//     database: process.env.TYPEORM_DATABASE
// })

// // data 추가시 해당 문구 출력
// myDataSource.initialize()
//   .then(() => {
//     console.log("Data Source has been initialized!");
//   })
//   .catch((err) => {
//     console.error("Error occurred during Data Source initialization", err);
// 	  myDataSource.destroy();
//   });

// Health Check Code

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});


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


// app.post("/users/signup", async (req, res) => {
// 	const { name, email, profile_image, password } = req.body
    
// 	await myDataSource.query(
// 		`INSERT INTO users(
// 		    name,
// 		    email,
// 		    profile_image,
// 		    password
// 		) VALUES (?, ?, ?, ?);
// 		`,
// 		[ name, email, profile_image, password ]
// 	); 
//    res.status(201).json({ message : "successfully created" });
// });
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