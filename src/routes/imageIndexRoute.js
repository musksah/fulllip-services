const express = require('express');
const router = express.Router();
const imageIndexController = require('../controllers/imageIndexController')

router.post('/', imageIndexController.create);
router.get('/', imageIndexController.findAll);

module.exports = router;