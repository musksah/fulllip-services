const express = require('express');
const router = express.Router();
const imgInProductController = require('../controllers/index/imgInProductController')

router.post('/', imgInProductController.create);
router.get('/', imgInProductController.findAll);

module.exports = router;