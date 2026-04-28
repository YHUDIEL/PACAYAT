const prisma  = require('../config/db');
const { aplicarPuntos, verificarUmbralesConduccion } = require('../services/puntosService');

/**
 * POST /api/reportes
 * Body: { idAlumno, tipo, gravedad, descripcion }
 *
 * Ejecuta en TRANSACCIÓN:
 *  1. Obtiene inscripción activa
 *  2. Lee puntos actuales
 *  3. Calcula nuevos puntos
 *  4. Crea registro de reporte
 *  5. Actualiza puntos del alumno
 *  6. Verifica umbrales de avisos
 */
async function createReporte(req, res) {
  const { idAlumno, tipo, gravedad, descripcion } = req.body;
  const idUsuarioReporta = req.usuario.id;

  if (!idAlumno || !tipo || !gravedad || !descripcion) {
    return res.status(400).json({ message: 'Faltan campos requeridos' });
  }

  const alumnoId = parseInt(idAlumno);

  try {
    const reporte = await prisma.$transaction(async (tx) => {
      // Obtener inscripción activa del alumno
      const inscripcion = await tx.inscripcion.findFirst({
        where: { idAlumno: alumnoId, activa: true },
      });
      if (!inscripcion) throw new Error('El alumno no tiene inscripción activa');

      // Aplicar puntos (actualiza alumno y devuelve antes/después)
      const { puntosAntes, puntosDespues } = await aplicarPuntos(tx, alumnoId, gravedad);

      // Crear el reporte
      const nuevoReporte = await tx.reporte.create({
        data: {
          idAlumno:         alumnoId,
          idInscripcion:    inscripcion.id,
          idUsuarioReporta,
          tipo,
          gravedad,
          descripcion,
          puntosAntes,
          puntosDespues,
        },
        include: { alumno: { select: { nombreCompleto: true } } },
      });

      return { reporte: nuevoReporte, puntosDespues };
    });

    // Verificar umbrales fuera de la transacción (no crítico)
    await verificarUmbralesConduccion(alumnoId, reporte.puntosDespues);

    res.status(201).json(reporte.reporte);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Error al crear el reporte' });
  }
}

/**
 * GET /api/reportes
 * Query: { idAlumno, tipo, page, limit }
 */
async function getReportes(req, res) {
  const { idAlumno, tipo, page = 1, limit = 20 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const where = {
    ...(idAlumno ? { idAlumno: parseInt(idAlumno) } : {}),
    ...(tipo     ? { tipo }                          : {}),
  };

  try {
    const [reportes, total] = await Promise.all([
      prisma.reporte.findMany({
        where, skip, take: parseInt(limit),
        orderBy: { creadoEn: 'desc' },
        include: {
          alumno:          { select: { nombreCompleto: true, matricula: true } },
          usuarioReporta:  { select: { nombre: true, rol: true } },
        },
      }),
      prisma.reporte.count({ where }),
    ]);

    res.json({ reportes, total });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener reportes' });
  }
}

module.exports = { createReporte, getReportes };
