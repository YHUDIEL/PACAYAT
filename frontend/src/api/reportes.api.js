// src/api/reportes.api.js
import api from './client';

export const getReportes  = (params) => api.get('/reportes', { params });
export const createReporte = (data)  => api.post('/reportes', data);
