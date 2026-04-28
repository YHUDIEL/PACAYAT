export const formatDate = (date) => {
  if (!date) return '—';
  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit', month: 'short', year: 'numeric',
  }).format(new Date(date));
};

export const formatDateTime = (date) => {
  if (!date) return '—';
  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }).format(new Date(date));
};

export const ptsColor = (pts) => {
  if (pts <= 45) return 'danger';
  if (pts <= 65) return 'warning';
  return 'success';
};

export const ptsChange = (gravedad, tipo) => {
  const map = {
    GRAVE: -10, MEDIO: -5, NO_GRAVE: -2,
    MUY_POSITIVO: 6, MEDIANAMENTE: 4, LEVE: 2,
  };
  return map[gravedad] ?? 0;
};

export const rolLabel = (rol) => {
  const labels = {
    ADMIN: 'Administrador', DIRECTIVO: 'Directivo', DOCENTE: 'Docente',
    PREFECTO: 'Prefecto', SECRETARIA: 'Secretaría',
    CONTROL_ESCOLAR: 'Control Escolar', TUTOR: 'Tutor',
  };
  return labels[rol] || rol;
};

export const initials = (nombre = '') =>
  nombre.trim().split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
