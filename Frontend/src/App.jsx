import React, { useState, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar'; 

// Pages
import Home from './pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './pages/Dashboard';
import ServicesPage from './pages/ServicesPage';
import ServiceDetail from './components/services/ServiceDetail';
import BookingsPage from './pages/BookingsPage';
import ProfilePage from './pages/ProfilePage';
import ProviderList from './components/providers/ProviderList';
import ProviderProfile from './components/providers/ProviderProfile';

// Context
import { AuthContext } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-500 font-medium">Please wait...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen font-sans antialiased bg-gray-50">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1f2937',
            color: '#fff',
            borderRadius: '12px'
          },
        }}
      />

      {/* Header-ka wuxuu helayaa function-ka fura Sidebar-ka mobile-ka */}
      <Header onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex flex-1 relative overflow-x-hidden">
        
        {/* Sidebar-ku wuxuu soo muuqanayaa kaliya marka qofku login yahay */}
        {isAuthenticated && (
          <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}

        {/* Main Content: 
          - md:ml-64 waxay banaynaysaa booska Sidebar-ka (w-64) marka qofku login yahay.
          - transition-all waxay ka dhigaysaa isbeddelka mid fudud.
        */}
        <main className={`flex-grow transition-all duration-300 ${isAuthenticated ? 'md:ml-64' : ''}`}>
          <div className="p-4 md:p-8">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:id" element={<ServiceDetail />} />
              <Route path="/providers" element={<ProviderList />} />
              <Route path="/providers/:id" element={<ProviderProfile />} />

              {/* Protected Routes (Kuwa u baahan Login) */}
              <Route 
                path="/dashboard" 
                element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
              />
              <Route 
                path="/bookings" 
                element={<ProtectedRoute><BookingsPage /></ProtectedRoute>} 
              />
              <Route 
                path="/profile" 
                element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} 
              />

              {/* Haddii link khaldan la qoro */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;