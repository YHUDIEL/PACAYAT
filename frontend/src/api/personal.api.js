// src/api/personal.api.js
import api from './client';

export const getPersonal   = (params)   => api.get('/personal', { params });
export const createPersonal = (data)    => api.post('/personal', data);
export const updatePersonal = (id,data) => api.put(`/personal/${id}`, data);
export const deletePersonal = (id)      => api.delete(`/personal/${id}`);
