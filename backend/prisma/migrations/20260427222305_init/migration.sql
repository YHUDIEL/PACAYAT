-- AlterTable
ALTER TABLE "reportes" ADD COLUMN     "id_inscripcion" INTEGER;

-- AddForeignKey
ALTER TABLE "reportes" ADD CONSTRAINT "reportes_id_inscripcion_fkey" FOREIGN KEY ("id_inscripcion") REFERENCES "inscripciones"("id") ON DELETE SET NULL ON UPDATE CASCADE;
