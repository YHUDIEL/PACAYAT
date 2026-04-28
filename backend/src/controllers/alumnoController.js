const prisma = require('../config/db');

/**
 * GET /api/alumnos
 * Query: { q, grupo, estado, page, limit }
 */
async function getAlumnos(req, res) {
  const { q = '', grupo = '', estado = '', page = 1, limit = 20 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const where = {
    AND: [
      q ? {
        OR: [
          { nombreCompleto: { contains: q, mode: 'insensitive' } },
          { matricula:      { contains: q, mode: 'insensitive' } },
        ],
      } : {},
      grupo  ? { inscripciones: { some: { grupo: { nombre: grupo }, activa: true } } } : {},
      estado ? { activo: estado === 'Activo' } : {},
    ],
  };

  try {
    const [alumnos, total] = await Promise.all([
      prisma.alumno.findMany({
        where, skip, take: parseInt(limit),
        orderBy: { nombreCompleto: 'asc' },
        select: {
          id: true, matricula: true, nombreCompleto: true,
          puntosConducta: true, activo: true,
          inscripciones: {
            where: { activa: true },
            select: { grupo: { select: { nombre: true } } },
            take: 1,
          },
          tutor: {
            select: { nombreCompleto: true },
          },
        },
      }),
      prisma.alumno.count({ where }),
    ]);

    const data = alumnos.map(a => ({
      id:             a.id,
      matricula:      a.matricula,
      nombreCompleto: a.nombreCompleto,
      puntosConducta: a.puntosConducta,
      estado:         a.activo ? 'Activo' : 'Inactivo',
      grupo:          a.inscripciones[0]?.grupo?.nombre || '—',
      tutor:          a.tutor?.nombreCompleto || '—',
    }));

    res.json({ alumnos: data, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener alumnos' });
  }
}

/**
 * GET /api/alumnos/buscar?q=texto
 * Para el buscador del modal de reportes.
 */
async function buscarAlumnos(req, res) {
  const { q = '' } = req.query;
  if (q.length < 2) return res.json([]);

  try {
    const alumnos = await prisma.alumno.findMany({
      where: {
        activo: true,
        OR: [
          { nombreCompleto: { contains: q, mode: 'insensitive' } },
          { matricula:      { contains: q, mode: 'insensitive' } },
        ],
      },
      take: 8,
      select: {
        id: true, matricula: true, nombreCompleto: true, puntosConducta: true,
        inscripciones: {
          where: { activa: true },
          select: { grupo: { select: { nombre: true } } },
          take: 1,
        },
      },
    });

    const data = alumnos.map(a => ({
      id:             a.id,
      matricula:      a.matricula,
      nombre:         a.nombreCompleto,
      puntosConducta: a.puntosConducta,
      grupo:          a.inscripciones[0]?.grupo?.nombre || '—',
    }));

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error en la búsqueda' });
  }
}

/**
 * GET /api/alumnos/:id
 */
async function getAlumno(req, res) {
  const { id } = req.params;
  try {
    const alumno = await prisma.alumno.findUnique({
      where: { id: parseInt(id) },
      include: {
        inscripciones: {
          where: { activa: true },
          include: { grupo: true },
        },
        tutor: true,
      },
    });
    if (!alumno) return res.status(404).json({ message: 'Alumno no encontrado' });
    res.json(alumno);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el alumno' });
  }
}

/**
 * POST /api/alumnos
 */
async function createAlumno(req, res) {
  const { matricula, nombreCompleto, fechaNacimiento, curp, domicilio } = req.body;
  try {
    const alumno = await prisma.alumno.create({
      data: { matricula, nombreCompleto, fechaNacimiento: new Date(fechaNacimiento), curp, domicilio },
    });
    res.status(201).json(alumno);
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(409).json({ message: 'La matrícula o CURP ya existe' });
    }
    res.status(500).json({ message: 'Error al crear el alumno' });
  }
}

/**
 * PUT /api/alumnos/:id
 */
async function updateAlumno(req, res) {
  const { id } = req.params;
  const { nombreCompleto, domicilio, curp } = req.body;
  try {
    const alumno = await prisma.alumno.update({
      where: { id: parseInt(id) },
      data:  { nombreCompleto, domicilio, curp },
    });
    res.json(alumno);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar el alumno' });
  }
}

/**
 * DELETE /api/alumnos/:id  (soft delete)
 */
async function deleteAlumno(req, res) {
  const { id } = req.params;
  try {
    await prisma.alumno.update({
      where: { id: parseInt(id) },
      data:  { activo: false },
    });
    res.json({ message: 'Alumno desactivado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar el alumno' });
  }
}

module.exports = { getAlumnos, buscarAlumnos, getAlumno, createAlumno, updateAlumno, deleteAlumno };
