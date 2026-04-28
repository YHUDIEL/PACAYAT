// src/api/asistencia.api.js
import api from './client';

export const getAsistencia = (params) => api.get('/asistencia', { params });
export const guardarAsistencia = (data) => api.post('/asistencia/masivo', data);
