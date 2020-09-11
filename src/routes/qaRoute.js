const express = require('express');
const router = express.Router();
const adviceController = require('../controllers/qaController');
const { checkJwt } = require('../middlewares/jwt');

// GetALL
router.get('/', adviceController.findAll);

// getById
// router.get('/:id', adviceController.findAll);

// Actualizar
// router.put('/:id', adviceController.findAll);

// Elmiminar
// router.delete('/:id', adviceController.findAll);

// Registrar
router.post('/', adviceController.create);




module.exports = router;