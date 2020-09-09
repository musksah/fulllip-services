const express = require('express');
const router = express.Router();
const adviceController = require('../controllers/adviceController');
const { checkJwt } = require('../middlewares/jwt');


router.get('/', adviceController.findAll);

router.post('/create', adviceController.create);



module.exports = router;