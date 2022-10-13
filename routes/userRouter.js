const express = require("express");
const validation = require("../middlewares/auth");
const userController = require("../controllers/userController");
const passport = require("passport");
const router = express.Router();

router.post("/signup", userController.signUp);
router.post("/login", userController.login); // login 해서 token을 클라이이언트에게 발급
// router.get("/kakao", passport.authenticate("kakao"));
// router.get("/kakao/callback", userController.kakaoCallback);
router.get("/profile", validation.validateToken, userController.profile);

module.exports = {
  router,
};
