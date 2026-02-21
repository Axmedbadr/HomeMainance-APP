import axios from 'axios';

/**
 * 1. Base URL Hubinta:
 * Haddii uu jiro VITE_API_URL (Production/Railway) isticmaal, 
 * haddii kale isticmaal localhost (Development).
 */
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5006';

const api = axios.create({
  baseURL: `${BASE_URL}/api`, // Wuxuu had iyo jeer ku darayaa /api dhib la'aan
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 ilbiriqsi haddii uu waayo server-ka ha iska daayo
});

/**
 * 2. Request Interceptor:
 * Ku darista Token-ka Authorization Header-ka si ammaan ah.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 3. Response Interceptor (Error Handling):
 * Haddii server-ku u soo jawaabi waayo ama CORS dhaco, 
 * halkan ayaa lagu qabanayaa si uusan app-ku u "crash" gareyn.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Haddii Token-ku dhacay (401 Unauthorized)
    if (error.response && error.response.status === 401) {
      console.warn("Token-kaagu waa dhacay, fadlan dib u login gareey.");
      // localStorage.removeItem('token'); // Option: si toos ah u saar
    }

    // Haddii Network-gu go'an yahay ama URL-ku khaldan yahay (ERR_NETWORK)
    if (error.code === 'ERR_NETWORK') {
      console.error("CORS ama Network Error: Hubi in Backend-ku uu shaqaynayo!");
    }

    return Promise.reject(error);
  }
);

export default api;