const express = require('express');
const router = express.Router();
const adviceController = require('../controllers/qaController');
const { checkJwt } = require('../middlewares/jwt');


router.get('/', adviceController.findAll);

router.post('/create', adviceController.create);



module.exports = router;