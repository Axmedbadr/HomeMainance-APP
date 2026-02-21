import axios from 'axios';

const api = axios.create({
  // Waxaan ka saarnay qaybtii env-ga si aan u hubinno inuu kan kaliya isticmaalo
  baseURL: 'https://homemainance-app-production.up.railway.app/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;