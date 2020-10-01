const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');




router.post('/', userController.login);

router.post('/register', userController.register);

router.post('/confirmation/:token', userController.confirmation);

router.get('/', userController.session);

router.post('/logout', userController.logOut)

router.put('/:id', userController.updatePassword);

module.exports = router;