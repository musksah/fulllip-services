const express = require('express');
const router = express.Router();
const imageIndexController = require('../controllers/index/imgCarrousellController')

router.post('/', imageIndexController.create);
router.post('/update-file', imageIndexController.updateFile);
router.get('/', imageIndexController.findAll);

module.exports = router;