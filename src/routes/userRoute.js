const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');




router.post('/', userController.login);

router.post('/register', userController.register);

router.post('/logout', userController.logOut)

module.exports = router;