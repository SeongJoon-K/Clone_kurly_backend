const { myDataSource } = require("../dbconfig");

// userDao 라우팅이 안되어 있어 app.js 에서 POST req 사용하였음.

const createUser = async (loginId, hashedPassword, name) => {
  return await myDataSource.query(
    `INSERT INTO users(
		loginId,
		password,
		name
	) VALUES (?, ?, ?);
	`,
    [loginId, hashedPassword, name]
  );
};

const login = async (loginId) => {
  return await myDataSource.query(
    `SELECT * FROM users
		WHERE loginId=?`,
    [loginId]
  );
};

// const check = async ()

module.exports = {
  createUser,
  login,
};
