import api from './api'

export const authService = {
  // 1. Diiwaangelinta (Register)
  // Waxay ku xirmaysaa: POST http://localhost:5006/api/users/register
  register: async (userData) => {
    const response = await api.post('/users/register', userData)
    return response.data
  },

  // 2. Soo gelidda (Login)
  // Waxay ku xirmaysaa: POST http://localhost:5006/api/users/login
  login: async (credentials) => {
    const response = await api.post('/users/login', credentials)
    return response.data
  },

  // 3. Helista macluumaadka qofka (Get current user)
  // Waxay ku xirmaysaa: GET http://localhost:5006/api/users/me
  getMe: async () => {
    const response = await api.get('/users/me')
    return response.data
  },

  // 4. Cusboonaysiinta Profile-ka
  updateProfile: async (userData) => {
    const response = await api.put('/users/profile', userData)
    return response.data
  },

  // 5. Beddelista Password-ka
  changePassword: async (passwordData) => {
    const response = await api.put('/users/change-password', passwordData)
    return response.data
  },

  // 6. Hilmaamidda Password-ka
  forgotPassword: async (email) => {
    const response = await api.post('/users/forgot-password', { email })
    return response.data
  },
}