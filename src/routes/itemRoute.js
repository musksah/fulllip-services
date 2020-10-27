const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.post('/', itemController.create);

router.get('/', itemController.findAll);

router.put('/:id', itemController.update);

router.get('/:userId', itemController.findOne);


module.exports = router;