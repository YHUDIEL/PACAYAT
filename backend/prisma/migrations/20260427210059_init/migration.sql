-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ADMIN', 'DIRECTIVO', 'DOCENTE', 'PREFECTO', 'SECRETARIA', 'CONTROL_ESCOLAR', 'TUTOR');

-- CreateEnum
CREATE TYPE "TipoReporte" AS ENUM ('POSITIVO', 'NEGATIVO');

-- CreateEnum
CREATE TYPE "GravedadReporte" AS ENUM ('GRAVE', 'MEDIO', 'NO_GRAVE', 'MUY_POSITIVO', 'MEDIANAMENTE', 'LEVE');

-- CreateEnum
CREATE TYPE "EstadoAsistencia" AS ENUM ('PRESENTE', 'FALTA', 'RETARDO');

-- CreateEnum
CREATE TYPE "TipoAviso" AS ENUM ('CONDUCTA', 'PERIODO_EVALUACION', 'REINSCRIPCION', 'GENERAL');

-- CreateEnum
CREATE TYPE "DiaSemana" AS ENUM ('LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "nombre_completo" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "rol" "Rol" NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "periodos_escolares" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "periodos_escolares_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "periodos_evaluacion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "periodos_evaluacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "periodos_reinscripcion" (
    "id" SERIAL NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "periodos_reinscripcion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grupos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "grado" INTEGER NOT NULL,
    "seccion" TEXT NOT NULL,

    CONSTRAINT "grupos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "materias" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "clave" TEXT,

    CONSTRAINT "materias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personal" (
    "id" SERIAL NOT NULL,
    "nombre_completo" TEXT NOT NULL,
    "rol" "Rol" NOT NULL,
    "telefono" TEXT,
    "correo" TEXT,
    "curp" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "id_usuario" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "personal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tutores" (
    "id" SERIAL NOT NULL,
    "nombre_completo" TEXT NOT NULL,
    "telefono" TEXT,
    "correo" TEXT,
    "id_usuario" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tutores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alumnos" (
    "id" SERIAL NOT NULL,
    "nombre_completo" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "curp" TEXT,
    "fecha_nacimiento" TIMESTAMP(3),
    "direccion" TEXT,
    "puntos_conducta" INTEGER NOT NULL DEFAULT 100,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "id_grupo" INTEGER NOT NULL,
    "id_tutor" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alumnos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inscripciones" (
    "id" SERIAL NOT NULL,
    "id_alumno" INTEGER NOT NULL,
    "id_periodo_escolar" INTEGER NOT NULL,
    "id_grupo" INTEGER,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inscripciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asignaciones" (
    "id" SERIAL NOT NULL,
    "id_docente" INTEGER NOT NULL,
    "id_materia" INTEGER NOT NULL,
    "id_grupo" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "asignaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "horarios" (
    "id" SERIAL NOT NULL,
    "id_asignacion" INTEGER NOT NULL,
    "dia" "DiaSemana" NOT NULL,
    "numero_clase" INTEGER NOT NULL,
    "salon" TEXT,

    CONSTRAINT "horarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reportes" (
    "id" SERIAL NOT NULL,
    "id_alumno" INTEGER NOT NULL,
    "id_usuario_reporta" INTEGER NOT NULL,
    "tipo" "TipoReporte" NOT NULL,
    "gravedad" "GravedadReporte" NOT NULL,
    "descripcion" TEXT NOT NULL,
    "puntos_antes" INTEGER NOT NULL,
    "puntos_despues" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reportes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calificaciones" (
    "id" SERIAL NOT NULL,
    "id_inscripcion" INTEGER NOT NULL,
    "id_asignacion" INTEGER NOT NULL,
    "id_periodo" INTEGER NOT NULL,
    "calificacion" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "calificaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asistencias" (
    "id" SERIAL NOT NULL,
    "id_inscripcion" INTEGER NOT NULL,
    "id_asignacion" INTEGER NOT NULL,
    "fecha" DATE NOT NULL,
    "estado" "EstadoAsistencia" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "asistencias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avisos" (
    "id" SERIAL NOT NULL,
    "tipo" "TipoAviso" NOT NULL,
    "titulo" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "umbral_puntos" INTEGER,
    "canales" TEXT[],
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "avisos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avisos_enviados" (
    "id" SERIAL NOT NULL,
    "id_aviso" INTEGER NOT NULL,
    "id_usuario" INTEGER,
    "id_tutor" INTEGER,
    "id_alumno" INTEGER,
    "canal" TEXT NOT NULL,
    "enviado_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "avisos_enviados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "archivos_alumnos" (
    "id" SERIAL NOT NULL,
    "id_alumno" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "ruta" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "tamanio" INTEGER NOT NULL,
    "subido_por" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "archivos_alumnos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "configuracion_escuela" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "nombre" TEXT NOT NULL DEFAULT 'Secundaria Técnica 177',
    "direccion" TEXT,
    "telefono" TEXT,
    "correo" TEXT,
    "director" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "configuracion_escuela_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_username_key" ON "usuarios"("username");

-- CreateIndex
CREATE UNIQUE INDEX "grupos_nombre_key" ON "grupos"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "materias_nombre_key" ON "materias"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "materias_clave_key" ON "materias"("clave");

-- CreateIndex
CREATE UNIQUE INDEX "personal_id_usuario_key" ON "personal"("id_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "tutores_id_usuario_key" ON "tutores"("id_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "alumnos_matricula_key" ON "alumnos"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "inscripciones_id_alumno_id_periodo_escolar_key" ON "inscripciones"("id_alumno", "id_periodo_escolar");

-- CreateIndex
CREATE UNIQUE INDEX "asignaciones_id_docente_id_materia_id_grupo_key" ON "asignaciones"("id_docente", "id_materia", "id_grupo");

-- CreateIndex
CREATE UNIQUE INDEX "horarios_id_asignacion_dia_numero_clase_key" ON "horarios"("id_asignacion", "dia", "numero_clase");

-- CreateIndex
CREATE UNIQUE INDEX "calificaciones_id_inscripcion_id_asignacion_id_periodo_key" ON "calificaciones"("id_inscripcion", "id_asignacion", "id_periodo");

-- CreateIndex
CREATE UNIQUE INDEX "asistencias_id_inscripcion_id_asignacion_fecha_key" ON "asistencias"("id_inscripcion", "id_asignacion", "fecha");

-- AddForeignKey
ALTER TABLE "personal" ADD CONSTRAINT "personal_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutores" ADD CONSTRAINT "tutores_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alumnos" ADD CONSTRAINT "alumnos_id_grupo_fkey" FOREIGN KEY ("id_grupo") REFERENCES "grupos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alumnos" ADD CONSTRAINT "alumnos_id_tutor_fkey" FOREIGN KEY ("id_tutor") REFERENCES "tutores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscripciones" ADD CONSTRAINT "inscripciones_id_alumno_fkey" FOREIGN KEY ("id_alumno") REFERENCES "alumnos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscripciones" ADD CONSTRAINT "inscripciones_id_periodo_escolar_fkey" FOREIGN KEY ("id_periodo_escolar") REFERENCES "periodos_escolares"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscripciones" ADD CONSTRAINT "inscripciones_id_grupo_fkey" FOREIGN KEY ("id_grupo") REFERENCES "grupos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asignaciones" ADD CONSTRAINT "asignaciones_id_docente_fkey" FOREIGN KEY ("id_docente") REFERENCES "personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asignaciones" ADD CONSTRAINT "asignaciones_id_materia_fkey" FOREIGN KEY ("id_materia") REFERENCES "materias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asignaciones" ADD CONSTRAINT "asignaciones_id_grupo_fkey" FOREIGN KEY ("id_grupo") REFERENCES "grupos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horarios" ADD CONSTRAINT "horarios_id_asignacion_fkey" FOREIGN KEY ("id_asignacion") REFERENCES "asignaciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reportes" ADD CONSTRAINT "reportes_id_alumno_fkey" FOREIGN KEY ("id_alumno") REFERENCES "alumnos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reportes" ADD CONSTRAINT "reportes_id_usuario_reporta_fkey" FOREIGN KEY ("id_usuario_reporta") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calificaciones" ADD CONSTRAINT "calificaciones_id_inscripcion_fkey" FOREIGN KEY ("id_inscripcion") REFERENCES "inscripciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calificaciones" ADD CONSTRAINT "calificaciones_id_asignacion_fkey" FOREIGN KEY ("id_asignacion") REFERENCES "asignaciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calificaciones" ADD CONSTRAINT "calificaciones_id_periodo_fkey" FOREIGN KEY ("id_periodo") REFERENCES "periodos_evaluacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asistencias" ADD CONSTRAINT "asistencias_id_inscripcion_fkey" FOREIGN KEY ("id_inscripcion") REFERENCES "inscripciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asistencias" ADD CONSTRAINT "asistencias_id_asignacion_fkey" FOREIGN KEY ("id_asignacion") REFERENCES "asignaciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avisos_enviados" ADD CONSTRAINT "avisos_enviados_id_aviso_fkey" FOREIGN KEY ("id_aviso") REFERENCES "avisos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avisos_enviados" ADD CONSTRAINT "avisos_enviados_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "archivos_alumnos" ADD CONSTRAINT "archivos_alumnos_id_alumno_fkey" FOREIGN KEY ("id_alumno") REFERENCES "alumnos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "archivos_alumnos" ADD CONSTRAINT "archivos_alumnos_subido_por_fkey" FOREIGN KEY ("subido_por") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
