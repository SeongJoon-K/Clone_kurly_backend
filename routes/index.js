const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const categoryRouter = require("./categoryRouter");
const baskerRouter = require("./basketRouter");
const promotionRouter = require("./promotionRouter");
const favoriteRouter = require("./favoriteRouter");


router.use("/", userRouter.router);
router.use("/products", productRouter.router);
router.use("/categories", categoryRouter.router);
router.use("/baskets", baskerRouter.router);
router.use('/promotions', promotionRouter.router);
router.use('/favorites', favoriteRouter.router);


module.exports = {
    router
}