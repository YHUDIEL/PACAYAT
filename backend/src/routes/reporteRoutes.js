const express   = require('express');
const router    = express.Router();
const auth      = require('../middlewares/auth');
const roleGuard = require('../middlewares/roleGuard');
const ctrl      = require('../controllers/reporteController');

const PUEDEN_REPORTAR = ['ADMIN','DIRECTIVO','DOCENTE','PREFECTO','SECRETARIA','CONTROL_ESCOLAR'];

router.get('/',  auth, ctrl.getReportes);
router.post('/', auth, roleGuard(PUEDEN_REPORTAR), ctrl.createReporte);

module.exports = router;
