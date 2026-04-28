// prisma/seed.js
// Ejecutar: node prisma/seed.js

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  const hash = await bcrypt.hash('1234', 10);

  // ── 1. USUARIOS (uno por rol) ──────────────────────────────────────────────
  const usrAdmin = await prisma.usuario.upsert({
    where:  { username: 'admin' },
    update: {},
    create: { username: 'admin', nombre: 'Ana García López', password: hash, rol: 'ADMIN' },
  });

  const usrDirectivo = await prisma.usuario.upsert({
    where:  { username: 'directivo' },
    update: {},
    create: { username: 'directivo', nombre: 'Carlos Ramírez Vega', password: hash, rol: 'DIRECTIVO' },
  });

  const usrDocente = await prisma.usuario.upsert({
    where:  { username: 'docente' },
    update: {},
    create: { username: 'docente', nombre: 'María López Torres', password: hash, rol: 'DOCENTE' },
  });

  const usrPrefecto = await prisma.usuario.upsert({
    where:  { username: 'prefecto' },
    update: {},
    create: { username: 'prefecto', nombre: 'Juan Martínez Soto', password: hash, rol: 'PREFECTO' },
  });

  const usrSecretaria = await prisma.usuario.upsert({
    where:  { username: 'secretaria' },
    update: {},
    create: { username: 'secretaria', nombre: 'Rosa Hernández Cruz', password: hash, rol: 'SECRETARIA' },
  });

  const usrControl = await prisma.usuario.upsert({
    where:  { username: 'control_escolar' },
    update: {},
    create: { username: 'control_escolar', nombre: 'Pedro González Ruiz', password: hash, rol: 'CONTROL_ESCOLAR' },
  });

  const usrTutor = await prisma.usuario.upsert({
    where:  { username: 'tutor' },
    update: {},
    create: { username: 'tutor', nombre: 'Lucía Pérez Morales', password: hash, rol: 'TUTOR' },
  });

  console.log('✅ Usuarios creados');

  // ── 2. PERSONAL (perfil para roles de personal escolar) ───────────────────
  await prisma.personal.upsert({
    where:  { idUsuario: usrAdmin.id },
    update: {},
    create: { nombre: 'Ana García López', rol: 'ADMIN', idUsuario: usrAdmin.id },
  });

  await prisma.personal.upsert({
    where:  { idUsuario: usrDirectivo.id },
    update: {},
    create: { nombre: 'Carlos Ramírez Vega', rol: 'DIRECTIVO', idUsuario: usrDirectivo.id },
  });

  const personalDocente = await prisma.personal.upsert({
    where:  { idUsuario: usrDocente.id },
    update: {},
    create: { nombre: 'María López Torres', rol: 'DOCENTE', idUsuario: usrDocente.id },
  });

  await prisma.personal.upsert({
    where:  { idUsuario: usrPrefecto.id },
    update: {},
    create: { nombre: 'Juan Martínez Soto', rol: 'PREFECTO', idUsuario: usrPrefecto.id },
  });

  await prisma.personal.upsert({
    where:  { idUsuario: usrSecretaria.id },
    update: {},
    create: { nombre: 'Rosa Hernández Cruz', rol: 'SECRETARIA', idUsuario: usrSecretaria.id },
  });

  await prisma.personal.upsert({
    where:  { idUsuario: usrControl.id },
    update: {},
    create: { nombre: 'Pedro González Ruiz', rol: 'CONTROL_ESCOLAR', idUsuario: usrControl.id },
  });

  console.log('✅ Personal creado');

  // ── 3. TUTOR ───────────────────────────────────────────────────────────────
  const tutor = await prisma.tutor.upsert({
    where:  { idUsuario: usrTutor.id },
    update: {},
    create: { nombreCompleto: 'Lucía Pérez Morales', idUsuario: usrTutor.id, telefono: '5512345678' },
  });

  console.log('✅ Tutor creado');

  // ── 4. PERIODO ESCOLAR ─────────────────────────────────────────────────────
  const periodo = await prisma.periodoEscolar.upsert({
    where:  { id: 1 },
    update: {},
    create: {
      id:          1,
      nombre:      '2025-2026',
      fechaInicio: new Date('2025-08-01'),
      fechaFin:    new Date('2026-07-31'),
      activo:      true,
    },
  });

  console.log('✅ Periodo escolar creado');

  // ── 5. GRUPOS ──────────────────────────────────────────────────────────────
  const grupo1A = await prisma.grupo.upsert({
    where:  { nombre: '1°A' },
    update: {},
    create: { nombre: '1°A', grado: 1, seccion: 'A' },
  });

  const grupo2B = await prisma.grupo.upsert({
    where:  { nombre: '2°B' },
    update: {},
    create: { nombre: '2°B', grado: 2, seccion: 'B' },
  });

  const grupo3C = await prisma.grupo.upsert({
    where:  { nombre: '3°C' },
    update: {},
    create: { nombre: '3°C', grado: 3, seccion: 'C' },
  });

  console.log('✅ Grupos creados');

  // ── 6. MATERIAS ────────────────────────────────────────────────────────────
  const matMat = await prisma.materia.upsert({
    where:  { nombre: 'Matemáticas' },
    update: {},
    create: { nombre: 'Matemáticas', clave: 'MAT-01' },
  });

  const matEsp = await prisma.materia.upsert({
    where:  { nombre: 'Español' },
    update: {},
    create: { nombre: 'Español', clave: 'ESP-01' },
  });

  console.log('✅ Materias creadas');

  // ── 7. ASIGNACIÓN DOCENTE ──────────────────────────────────────────────────
  await prisma.asignacion.upsert({
    where: {
      idDocente_idMateria_idGrupo: {
        idDocente: personalDocente.id,
        idMateria: matMat.id,
        idGrupo:   grupo1A.id,
      },
    },
    update: {},
    create: { idDocente: personalDocente.id, idMateria: matMat.id, idGrupo: grupo1A.id },
  });

  await prisma.asignacion.upsert({
    where: {
      idDocente_idMateria_idGrupo: {
        idDocente: personalDocente.id,
        idMateria: matEsp.id,
        idGrupo:   grupo2B.id,
      },
    },
    update: {},
    create: { idDocente: personalDocente.id, idMateria: matEsp.id, idGrupo: grupo2B.id },
  });

  console.log('✅ Asignaciones creadas');

  // ── 8. ALUMNOS ─────────────────────────────────────────────────────────────
  const alumno1 = await prisma.alumno.upsert({
    where:  { matricula: '2025001' },
    update: {},
    create: {
      nombreCompleto: 'Sofía Mendoza Rivera',
      matricula:      '2025001',
      puntosConducta: 100,
      idGrupo:        grupo1A.id,
      idTutor:        tutor.id,
    },
  });

  const alumno2 = await prisma.alumno.upsert({
    where:  { matricula: '2025002' },
    update: {},
    create: {
      nombreCompleto: 'Diego Ramos Castro',
      matricula:      '2025002',
      puntosConducta: 85,
      idGrupo:        grupo1A.id,
      idTutor:        tutor.id,
    },
  });

  const alumno3 = await prisma.alumno.upsert({
    where:  { matricula: '2025003' },
    update: {},
    create: {
      nombreCompleto: 'Valentina Ortiz Fuentes',
      matricula:      '2025003',
      puntosConducta: 95,
      idGrupo:        grupo2B.id,
    },
  });

  const alumno4 = await prisma.alumno.upsert({
    where:  { matricula: '2025004' },
    update: {},
    create: {
      nombreCompleto: 'Emilio Vargas Peña',
      matricula:      '2025004',
      puntosConducta: 70,
      idGrupo:        grupo3C.id,
      idTutor:        tutor.id,
    },
  });

  console.log('✅ Alumnos creados');

  // ── 9. INSCRIPCIONES ───────────────────────────────────────────────────────
  await prisma.inscripcion.upsert({
    where:  { idAlumno_idPeriodoEscolar: { idAlumno: alumno1.id, idPeriodoEscolar: periodo.id } },
    update: {},
    create: { idAlumno: alumno1.id, idPeriodoEscolar: periodo.id, idGrupo: grupo1A.id, activa: true },
  });

  await prisma.inscripcion.upsert({
    where:  { idAlumno_idPeriodoEscolar: { idAlumno: alumno2.id, idPeriodoEscolar: periodo.id } },
    update: {},
    create: { idAlumno: alumno2.id, idPeriodoEscolar: periodo.id, idGrupo: grupo1A.id, activa: true },
  });

  await prisma.inscripcion.upsert({
    where:  { idAlumno_idPeriodoEscolar: { idAlumno: alumno3.id, idPeriodoEscolar: periodo.id } },
    update: {},
    create: { idAlumno: alumno3.id, idPeriodoEscolar: periodo.id, idGrupo: grupo2B.id, activa: true },
  });

  await prisma.inscripcion.upsert({
    where:  { idAlumno_idPeriodoEscolar: { idAlumno: alumno4.id, idPeriodoEscolar: periodo.id } },
    update: {},
    create: { idAlumno: alumno4.id, idPeriodoEscolar: periodo.id, idGrupo: grupo3C.id, activa: true },
  });

  console.log('✅ Inscripciones creadas');

  // ── 10. CONFIGURACIÓN ESCUELA ──────────────────────────────────────────────
  await prisma.configuracionEscuela.upsert({
    where:  { id: 1 },
    update: {},
    create: { id: 1, nombre: 'Secundaria Técnica 177', director: 'Carlos Ramírez Vega' },
  });

  console.log('✅ Configuración escuela creada');
  console.log('\n🎉 Seed completado exitosamente');
  console.log('\n📋 Usuarios de prueba (todos con contraseña: 1234)');
  console.log('   admin           → ADMIN');
  console.log('   directivo       → DIRECTIVO');
  console.log('   docente         → DOCENTE');
  console.log('   prefecto        → PREFECTO');
  console.log('   secretaria      → SECRETARIA');
  console.log('   control_escolar → CONTROL_ESCOLAR');
  console.log('   tutor           → TUTOR');
}

main()
  .catch((e) => { console.error('❌ Error en seed:', e); process.exit(1); })
  .finally(() => prisma.$disconnect());
