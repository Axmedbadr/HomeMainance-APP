import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

const SetPassword = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Backend-ka u dir email-ka iyo password-ka cusub
      await api.post('/users/set-initial-password', { email, password });
      toast.success("Password-ka waa la kaydiyay! Hadda waad soo geli kartaa.");
      navigate('/login');
    } catch (error) {
      toast.error("Khalad ayaa dhacay!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-96">
        <h2 className="text-xl font-bold mb-4">U Samee Password Account-kaaga</h2>
        <p className="text-sm text-gray-500 mb-6">Email: {email}</p>
        <form onSubmit={handleSave} className="space-y-4">
          <input 
            type="password" 
            placeholder="Password-ka Cusub" 
            className="w-full p-3 border rounded-xl"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">
            Kaydi Password-ka
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetPassword;