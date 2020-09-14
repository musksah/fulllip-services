const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');


router.post('/', customerController.findOne);

router.put('/:id', customerController.updateProfile);



module.exports = router;
