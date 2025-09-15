import axios from 'axios'
export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

export const listForms   = () => api.get('/forms').then(r=>r.data)
export const getForm     = (id) => api.get(`/forms/${id}`).then(r=>r.data)
export const createForm  = (payload) => api.post('/forms', payload).then(r=>r.data)
export const updateForm  = (id,payload) => api.put(`/forms/${id}`, payload).then(r=>r.data)
export const submitForm  = (id,data) => api.post(`/forms/${id}/submissions`, { data }).then(r=>r.data)
