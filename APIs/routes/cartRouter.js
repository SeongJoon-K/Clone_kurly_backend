const express = require('express');
const baskerController = require('../controllers/cartController');

const router = express.Router();

router.post('/', baskerController.baskets);
router.get('/', baskerController.getbasket);
router.put('/:id', baskerController.updatebasket);
router.delete('/:id', baskerController.deletebasket);

module.exports = {
    router
}