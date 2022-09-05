const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/login', userController.login); // login 해서 token을 클라이이언트에게 발급
router.get('/check', userController.check);


module.exports = {
	router
}