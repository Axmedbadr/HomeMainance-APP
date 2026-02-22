import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import api from '../services/api'; 
import toast from 'react-hot-toast';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser && savedUser !== "undefined" ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const logout = useCallback((showToast = true) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    if (showToast) toast.success('Si guul leh ayaad ka baxday!');
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await api.get('/users/profile'); 
          if (response.data.success) {
            setUser(response.data.user);
            setIsAuthenticated(true);
          }
        } catch (error) {
          logout(false); 
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, [logout]);

  // --- REGISTER LOGIC (Kala saarista Provider & Customer) ---
  const register = async (userData) => {
    try {
      const response = await api.post('/users/register', userData);
      
      // HADDII UU YAHAY PROVIDER: Codsiga waa la kaydiyay laakiin Login ma dhacayo
      if (userData.role === 'provider') {
        toast.success('Codsigaaga waa la gudbiyey! Fadlan sug ansixinta Admin-ka.');
        return { ...response.data, isPendingProvider: true }; 
      }

      // HADDII UU YAHAY CUSTOMER: Caadi u Login garee
      const { token, user: newUser } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      setIsAuthenticated(true);
      toast.success('Diiwaangelintu si guul leh ayay u dhacday!');
      return response.data;

    } catch (error) {
      const message = error.response?.data?.message || 'Diiwaangelintu ma suurtagalin';
      toast.error(message);
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await api.post('/users/login', credentials);
      const { token, user: userData } = response.data;

      // Xannibaad: Provider-ka lama ogola ilaa laga 'approved' gareeyo
      if (userData.role === 'provider' && userData.status !== 'approved') {
        toast.error('Koontadaada weli lama ansixin. Fadlan sug Admin-ka.');
        return null;
      }
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      toast.success('Si guul leh ayaad u soo gashay!');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Email ama Password waa khalad');
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, register }}>
      {!isLoading ? children : (
        <div className="flex items-center justify-center h-screen bg-[#020617]">
          <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);