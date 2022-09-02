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
    console.log("회원가입(signUp) DB연동 완료");
  })
  .catch((err) => {
    console.error("Error occurred during Data Source initialization", err);
	  myDataSource.destroy();
  });

// userDao 라우팅이 안되어 있어 app.js 에서 POST req 사용하였음.

const createUser = async ( name, email, password, profileImage ) => {
	try {
		return await myDataSource.query(
		`INSERT INTO users(
		    name,
		    email,
		    password,
		    profile_image,
		) VALUES (?, ?, ?, ?);
		`,
		[ name, email, password, profileImage ]
	  );
	} catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}
};




module.exports = {
  createUser
}