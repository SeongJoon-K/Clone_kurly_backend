const express = require('express');
const categoryCotroller = require('../controllers/categoryController');

const router = express.Router();

router.get('/:id', categoryCotroller.getcategory);

module.exports = {
    router
}