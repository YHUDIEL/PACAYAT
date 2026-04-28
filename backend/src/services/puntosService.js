const prisma = require('../config/db');

const DELTAS = {
  GRAVE:        -10,
  MEDIO:        -5,
  NO_GRAVE:     -2,
  MUY_POSITIVO: +6,
  MEDIANAMENTE: +4,
  LEVE:         +2,
};

/**
 * Calcula y aplica el cambio de puntos de conducta de un alumno.
 * Se ejecuta dentro de la transacción del reporte.
 * @param {object} tx       - instancia de prisma transaction
 * @param {number} idAlumno
 * @param {string} gravedad - clave de DELTAS
 * @returns {{ puntosAntes, puntosDespues }}
 */
async function aplicarPuntos(tx, idAlumno, gravedad) {
  const alumno = await tx.alumno.findUnique({
    where: { id: idAlumno },
    select: { puntosConducta: true },
  });

  if (!alumno) throw new Error('Alumno no encontrado');

  const delta         = DELTAS[gravedad] ?? 0;
  const puntosAntes   = alumno.puntosConducta;
  const puntosDespues = Math.max(0, Math.min(100, puntosAntes + delta));

  await tx.alumno.update({
    where: { id: idAlumno },
    data:  { puntosConducta: puntosDespues },
  });

  return { puntosAntes, puntosDespues };
}

/**
 * Verifica si algún aviso de tipo CONDUCTA debe dispararse.
 * Se llama después de actualizar los puntos.
 */
async function verificarUmbralesConduccion(idAlumno, puntosDespues) {
  const avisos = await prisma.aviso.findMany({
    where: { tipo: 'CONDUCTA', activo: true },
  });

  for (const aviso of avisos) {
    if (aviso.umbralPuntos !== null && puntosDespues <= aviso.umbralPuntos) {
      // TODO: Fase 5 - disparar envío al tutor
      console.log(`[AVISO] Alumno ${idAlumno} cruzó umbral ${aviso.umbralPuntos}pts - aviso "${aviso.titulo}"`);
    }
  }
}

module.exports = { aplicarPuntos, verificarUmbralesConduccion };
