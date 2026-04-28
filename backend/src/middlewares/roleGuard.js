/**
 * Middleware de autorización por rol.
 * Uso: roleGuard(['ADMIN', 'SECRETARIA'])
 *
 * Requiere que auth() ya haya sido ejecutado (req.usuario debe existir).
 */
function roleGuard(rolesPermitidos = []) {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ message: 'No autenticado' });
    }
    if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({
        message: `Acceso denegado. Se requiere uno de los siguientes roles: ${rolesPermitidos.join(', ')}`,
      });
    }
    next();
  };
}

module.exports = roleGuard;
