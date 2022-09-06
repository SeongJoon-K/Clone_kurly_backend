const express = require('express');
const baskerController = require('../controllers/basketController');

const router = express.Router();

router.post('/add', baskerController.baskets);
router.get('/:user_id', baskerController.getbasket);
router.put('/:user_id/:product_id', baskerController.updatebasket);
router.delete('/:user_id/:product_id', baskerController.deletebasket);

module.exports = {
    router
}