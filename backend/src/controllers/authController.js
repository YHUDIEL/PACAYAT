const prisma  = require('../config/db');
const jwt     = require('jsonwebtoken');
const bcrypt  = require('bcryptjs');

/**
 * GET /api/auth/usuarios-por-rol/:rol
 * Devuelve la lista de usuarios (nombre + username) para el desplegable del login.
 * NO devuelve contraseñas.
 */
async function getUsuariosPorRol(req, res) {
  const { rol } = req.params;
  try {
    const usuarios = await prisma.usuario.findMany({
      where:  { rol, activo: true },
      select: { id: true, username: true, nombre: true },
      orderBy: { nombre: 'asc' },
    });
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
}

/**
 * POST /api/auth/login
 * Body: { username, password, rol }
 * Respuesta: { token, usuario: { id, nombre, rol, username } }
 */
async function login(req, res) {
  const { username, password, rol } = req.body;

  if (!username || !password || !rol) {
    return res.status(400).json({ message: 'Faltan campos requeridos' });
  }

  try {
    const usuario = await prisma.usuario.findFirst({
      where: { username, rol, activo: true },
    });

    if (!usuario) {
      return res.status(401).json({ message: 'Usuario no encontrado o inactivo' });
    }

    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: usuario.id, username: usuario.username, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    );

    res.json({
      token,
      usuario: {
        id:       usuario.id,
        nombre:   usuario.nombre,
        username: usuario.username,
        rol:      usuario.rol,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
}

module.exports = { getUsuariosPorRol, login };
