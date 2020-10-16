const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.post('/send-mail-contact', emailController.sendMailContact);

module.exports = router;