const { myDataSource } = require("../dbconfig");

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

const profile = async (userId) => {
  return await myDataSource.query(
    `SELECT 
    name 
    FROM users
    WHERE id=?`,
    [userId]
  );
};

module.exports = {
  createUser,
  login,
  profile,
};
