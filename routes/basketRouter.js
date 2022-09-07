const express = require('express');
const baskerController = require('../controllers/basketController');

const router = express.Router();

router.post('/', baskerController.baskets);
router.get('/:id', baskerController.getbasket);
router.put('/:id', baskerController.updatebasket);
router.delete('/:id', baskerController.deletebasket);

module.exports = {
    router
}