const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');




router.post('/', userController.login);

router.post('/register', userController.register);

router.post('/confirmation/:token', userController.confirmation);

router.get('/confirmation-email/:token', userController.confirmationEmail);

router.get('/', userController.session);

router.get('/email', userController.emails);

router.post('/logout', userController.logOut)

router.put('/:id', userController.updatePassword);

router.put('/password/:id', userController.updatePasswordEmail);

router.post('/user', userController.findOne);

module.exports = router;