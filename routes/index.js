const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const categoryRouter = require("./categoryRouter");
const baskerRouter = require("./basketRouter");


router.use("/users", userRouter.router);
router.use("/products", productRouter.router);
router.use("/categories", categoryRouter.router);
router.use("/baskets", baskerRouter.router);


module.exports = router;