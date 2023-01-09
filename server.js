require('dotenv').config();

const { createApp } = require('./app');
const { kurlyDataSource } = require('./APIs/models/data-source');

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT;

  await kurlyDataSource
    .initialize()
    .then(() => {
      console.log('Data Source has been initialized');
    })
    .catch(() => {
      console.error('Error during Data Source initialization', err);
      database.destroy();
    });

  app.listen(PORT || 3000, () => {
    console.log(`Server listening on port ${process.env.PORT || 3000}`);
  });
};

startServer();
