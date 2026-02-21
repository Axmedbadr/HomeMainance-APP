import axios from 'axios';

const api = axios.create({
  // Haddii uu jiro VITE_API_URL (Railway) isticmaal, haddii kale localhost
  baseURL: import.meta.env.VITE_API_URL || 'https://homemainance-app-production.up.railway.app/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;