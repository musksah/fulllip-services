const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.post('/send-mail-contact', emailController.sendMailContact);

router.post('/send-mail-change', emailController.sendMailChange);

module.exports = router;