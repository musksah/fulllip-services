const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');


router.get('/', couponController.findAll);

router.get('/sales/:id', couponController.findDetailSale);

router.post('/', couponController.create);

router.put('/:id', couponController.update);

router.delete('/:id', couponController.destroy);

router.post('/check', couponController.findOne);

module.exports = router;