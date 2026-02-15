import axios from 'axios'

// 1. Hubi in URL-kani uu la mid yahay kan uu Server-kaagu ku shaqaynayo (Port 5006)
// Tani waxay xallinaysaa xiriirka ka dhexeeya Frontend iyo Backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5006/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 2. Request interceptor - Waxay Token-ka ku daraysaa Header-ka mar kasta
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 3. Response interceptor - Waxay xalisaa haddii Token-ku uu dhaco (401 Error)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Haddii 401 (Unauthorized) la helo, qofka dibadda u saar si uu u soo Login gareeyo
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api