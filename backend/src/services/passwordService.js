const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;

/**
 * Genera contraseña predeterminada para personal:
 * Formato: primeras 3 letras del apellido (mayúsc.) + año actual + '!'
 * Ejemplo: GAR2025!
 */
function generarPasswordPersonal(apellido = '') {
  const parte = apellido.replace(/\s/g, '').slice(0, 3).toUpperCase();
  const year  = new Date().getFullYear();
  return `${parte}${year}!`;
}

/**
 * Genera contraseña predeterminada para tutores:
 * Formato: TUTOR + número de 4 dígitos aleatorio
 */
function generarPasswordTutor() {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `TUTOR${num}`;
}

const hashPassword    = (plain) => bcrypt.hash(plain, SALT_ROUNDS);
const comparePassword = (plain, hash) => bcrypt.compare(plain, hash);

module.exports = { generarPasswordPersonal, generarPasswordTutor, hashPassword, comparePassword };
