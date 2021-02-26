const express = require('express');
const router = express.Router();
const imageIndexController = require('../controllers/index/imgCarrousellController');

router.post('/', imageIndexController.create);
router.post('/update-file', imageIndexController.updateFile);
router.post('/delete-file', imageIndexController.deleteFile);


router.get('/', imageIndexController.findAll);

module.exports = router;