const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/', orderController.findAll);
router.put('/:nOrder', orderController.update);


module.exports = router;