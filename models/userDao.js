const db = require('../db');
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
	const [user] = await myDataSource.query(
		`SELECT * FROM users
		WHERE login_id=?`,
		(login_id));
	return user
}

// const check = async ()

module.exports = {
  createUser,
  login
}

