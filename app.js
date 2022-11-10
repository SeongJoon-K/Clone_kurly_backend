require("dotenv").config();

const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes");
const { validateToken } = require("./middlewares/auth");
const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(routes.router);

const PORT = process.env.PORT;
const server = http.createServer(app);

const start = async () => {
  try {
    server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

start();
