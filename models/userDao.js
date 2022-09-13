const db = require('../db');
// userDao 라우팅이 안되어 있어 app.js 에서 POST req 사용하였음.

const createUser = async ( loginId, hashPw, name ) => {
	console.log("hash PW : ",hashPw)
	return await myDataSource.query(
	`INSERT INTO users(
		loginId,
		password,
		name
	) VALUES (?, ?, ?);
	`,
	[ loginId, hashPw, name ]
	);
};

const login = async ( loginId, password) => {
	const [user] = await myDataSource.query(
		`SELECT * FROM users
		WHERE loginId=?`,
		(loginId));
	return user
}

// const check = async ()

module.exports = {
  createUser,
  login
}

