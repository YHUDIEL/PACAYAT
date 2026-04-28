// src/services/avisoService.js
// Servicio de envío de avisos (Fase 5 — integración WhatsApp/correo)

/**
 * Envía un aviso al tutor de un alumno.
 * Por ahora solo loguea; en Fase 5 se integra nodemailer / Twilio.
 */
async function enviarAvisoTutor(tutor, aviso, alumno) {
  console.log(`[AVISO TUTOR] ${tutor.nombre} | Asunto: ${aviso.titulo} | Alumno: ${alumno.nombreCompleto}`);
  // TODO: nodemailer + WhatsApp según aviso.canales
}

/**
 * Envía aviso masivo a todos los tutores.
 */
async function enviarAvisoMasivo(destinatarios, aviso) {
  for (const dest of destinatarios) {
    console.log(`[AVISO MASIVO] → ${dest.nombre} | ${aviso.titulo}`);
  }
}

module.exports = { enviarAvisoTutor, enviarAvisoMasivo };
