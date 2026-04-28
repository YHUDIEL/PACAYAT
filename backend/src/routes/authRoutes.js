const express = require('express');
const router  = express.Router();
const { getUsuariosPorRol, login } = require('../controllers/authController');

router.get('/usuarios-por-rol/:rol', getUsuariosPorRol);
router.post('/login', login);

module.exports = router;
