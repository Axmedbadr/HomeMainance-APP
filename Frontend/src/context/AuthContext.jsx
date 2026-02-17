import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/authService.js';
import toast from 'react-hot-toast';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      // Hubi in xogtu ay tahay JSON sax ah ka hor intaanan parse gareyn
      return savedUser && savedUser !== "undefined" ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser && savedUser !== "undefined") {
      try {
        setIsAuthenticated(true);
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }
    setIsLoading(false);
  }, []);

  // 1. LOGIN LOGIC
  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      // Hubi in response.user uu leeyahay _id (Tani waxay xallisaa error-kaaga booking-ka)
      if (response && response.token) {
        localStorage.setItem('token', response.token); 
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        setIsAuthenticated(true);
        toast.success('Si guul leh ayaad u soo gashay!');
        return response;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login-ku ma suurtagalin');
      throw error;
    }
  };

  // 2. REGISTER LOGIC
  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      
      if (response && response.token && userData.role !== 'provider') {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        setIsAuthenticated(true);
        toast.success('Diiwaangelintu waa guul!');
      } else if (userData.role === 'provider') {
        toast.success('Codsigaaga waa la diray, sug ansixinta adminka.');
      }
      
      return response;
    } catch (error) {
      const message = error.response?.data?.message || 'Diiwaangelintu way fashilantay';
      toast.error(message);
      throw error;
    }
  };

  // 3. LOGOUT LOGIC
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Si guul leh ayaad ka baxday!');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};