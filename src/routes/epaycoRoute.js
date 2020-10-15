const express = require('express');
const router = express.Router();
const epaycoController = require('../controllers/epayco/epaycoController');


// router.get('/', adviceController.findAll);

router.post('/confirmation-payment', epaycoController.confirmationPayment);
router.get('/confirmation-payment', epaycoController.confirmationPayment);



module.exports = router;