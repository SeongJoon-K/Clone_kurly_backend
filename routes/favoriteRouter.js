const express = require('express');
const favoriteController = require('../controllers/favoriteController');

const router = express.Router();

router.get('/', favoriteController.getfavorite); // 해당 유저의 찜목록 HTTP

module.exports = {
    router
}