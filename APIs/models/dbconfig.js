const { DataSource } = require('typeorm');

const kurlyDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

kurlyDataSource
  .initialize()
  .then(() => {
    console.log('DB INTITIALIZED 완료');
  })
  .catch((err) => {
    console.error('Error occurred during Data Source initialization', err);
    kurlyDataSource.destroy();
  });

module.exports = {
  kurlyDataSource,
};
