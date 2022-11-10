const express = require("express");
const validation = require("../middlewares/auth");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.get("/profile", validation.validateToken, userController.profile);
router.get("/kakao/start", userController.startKakao);
router.get("/kakao/finish", userController.finishKakao);

module.exports = {
  router,
};
