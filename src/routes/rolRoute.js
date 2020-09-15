const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');

router.post('/', rolController.create);


module.exports = router;