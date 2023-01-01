require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./APIs/routes');
const { validateToken } = require('./APIs/middlewares/auth');
const { globalErrorHandler } = require('./APIs/middlewares/error');
const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(routes.router);

const PORT = process.env.PORT;

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

start();
