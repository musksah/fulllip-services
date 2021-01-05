const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const { checkJwt } = require('../middlewares/jwt');

router.get('/', settingsController.findOne);
router.put('/update', settingsController.update);

module.exports = router;