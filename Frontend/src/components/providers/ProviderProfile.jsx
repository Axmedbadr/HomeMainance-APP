import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProviderProfile = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProvider = async () => {
      try {
        // MUHIIM: Jidka API-ga waa inuu ahaadaa /api/providers/
        const res = await axios.get(`http://localhost:5006/api/providers/${id}`);
        setProvider(res.data.data || res.data); 
        setLoading(false);
      } catch (error) {
        console.error("Error loading provider:", error);
        setLoading(false);
      }
    };
    loadProvider();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading Profile...</div>;
  
  if (!provider) return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold">Provider Not Found</h2>
      <button onClick={() => navigate('/')} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg">Go Home</button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-3xl mt-10">
      <div className="flex items-center space-x-6">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-3xl font-bold text-blue-600">
          {provider.fullName?.charAt(0)}
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-800">{provider.fullName}</h1>
          <p className="text-blue-600 font-bold uppercase tracking-wider">{provider.serviceType}</p>
        </div>
      </div>

      <div className="mt-8 space-y-4 border-t pt-6">
        <p className="text-slate-600 leading-relaxed italic">"{provider.bio}"</p>
        <div className="grid grid-cols-2 gap-4 text-sm font-bold">
          <div className="bg-slate-50 p-4 rounded-2xl">📍 Location: {provider.location}</div>
          <div className="bg-slate-50 p-4 rounded-2xl">📞 Contact: {provider.phone}</div>
        </div>
      </div>

      {/* BATOONKA BOOKING-KA (Kani waa midka aad u baahnayd) */}
      <button 
        onClick={() => navigate(`/book-service/${provider._id}`)}
        className="w-full mt-10 bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-blue-200 active:scale-95"
      >
        Book Appointment Now
      </button>
    </div>
  );
};

export default ProviderProfile;