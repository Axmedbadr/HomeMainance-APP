import api from './api';

export const authService = {
  // 1. Diiwaangelinta (Register)
  register: async (userData) => {
    const response = await api.post('/users/register', userData);
    return response.data;
  },

  // 2. Soo gelidda (Login)
  login: async (credentials) => {
    const response = await api.post('/users/login', credentials);
    return response.data; 
  },

  // ... (Functions-kii kale ee aad haysatay)

  // 7. Codso Noqoshada Provider (Kani waa kan kuu dhiman!)
  applyAsProvider: async (formData) => {
    // Hubi inuu '/providers/apply' yahay si uu ula hadlo Backend-ka saxda ah
    const response = await api.post('/providers/apply', formData);
    return response.data; // Waxay soo celinaysaa { success: true, message: '...' }
  },
};

export default authService;