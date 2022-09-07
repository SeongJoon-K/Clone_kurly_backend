const { DataSource } = require('typeorm');

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
    console.log("유저(users) DB연동 완료");
  })
  .catch((err) => {
    console.error("Error occurred during Data Source initialization", err);
	  myDataSource.destroy();
  });

// userDao 라우팅이 안되어 있어 app.js 에서 POST req 사용하였음.

const createUser = async ( login_id, hashPw, name ) => {
	console.log("hash PW : ",hashPw)
	return await myDataSource.query(
	`INSERT INTO users(
		login_id,
		password,
		name
	) VALUES (?, ?, ?);
	`,
	[ login_id, hashPw, name ]
	);
};

const login = async ( login_id, password) => {
	const data = await myDataSource.query(
		`SELECT * FROM users
		WHERE login_id=?`,
		(login_id));
	return { ...data[0] }
}

// const check = async ()

module.exports = {
  createUser,
  login
}

