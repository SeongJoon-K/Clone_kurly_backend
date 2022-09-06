const express = require('express');
const baskerController = require('../controllers/basketController');

const router = express.Router();

router.post('/add', baskerController.baskets)
// router.get()
// router.put()
// router.delete()

module.exports = {
    router
}