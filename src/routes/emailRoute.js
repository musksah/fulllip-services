const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.post('/send-mail-contact', emailController.sendMailContact);
router.post('/send-test', emailController.sendTest);
router.post('/send-mail-change', emailController.sendMailChange);
router.get('/send-confirmation/:token', emailController.sendEmailConfirmation);

module.exports = router;