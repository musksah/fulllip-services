const express = require('express');
const router = express.Router();
const videosController = require('../controllers/videoController');


router.get('/', videosController.findAll);

router.post('/create', videosController.create);



module.exports = router