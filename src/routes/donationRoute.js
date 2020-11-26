const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
const { checkJwt } = require('../middlewares/jwt');


router.get('/', donationController.findAll);




module.exports = router;