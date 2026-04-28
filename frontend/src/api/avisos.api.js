// src/api/avisos.api.js
import api from './client';

export const getAvisos    = (tipo)   => api.get('/avisos', { params: { tipo } });
export const createAviso  = (data)   => api.post('/avisos', data);
export const updateAviso  = (id,data)=> api.put(`/avisos/${id}`, data);
export const deleteAviso  = (id)     => api.delete(`/avisos/${id}`);
