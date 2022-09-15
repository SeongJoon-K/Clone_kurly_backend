// app.js 기본 모듈 설정
const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const dotenv = require("dotenv");
dotenv.config();

const routes = require("./routes");
const { validateToken } = require("./middlewares/auth");
const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(routes.router);
// 여기서 routes/index가 아닌 이유는 해당 디렉토리를 호출시 필연적으로 index.js가 알아서 발동되기 때문에
// route만 작성한다.

const PORT = process.env.PORT; // .env에서 긁어온 포트 번호를 사용하겠다
const server = http.createServer(app);

const start = async () => {
  try {
    server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

start();
