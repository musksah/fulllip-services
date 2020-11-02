const express = require('express');
const router = express.Router();
const epaycoController = require('../controllers/epayco/epaycoController');


// router.get('/', adviceController.findAll);

router.post('/confirmation-payment', epaycoController.confirmationPayment);
router.get('/confirmation-payment', epaycoController.confirmationPayment);
router.post('/hash', epaycoController.pruebaHash);



module.exports = router;