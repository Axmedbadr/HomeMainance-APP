import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FiCheckCircle, FiXCircle, FiMail, FiMapPin } from 'react-icons/fi';

const ProviderVerifications = () => {
  const [pendingProviders, setPendingProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingProviders();
  }, []);

  const fetchPendingProviders = async () => {
    try {
      const response = await api.get('/providers');
      // Waxaan sifeeynaa oo kaliya kuwa 'pending' ah
      const pending = response.data.filter(p => p.status === 'pending');
      setPendingProviders(pending);
    } catch (error) {
      console.error("Cillad xogta bixiyeyaasha:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id, email) => {
    if (window.confirm(`Ma hubtaa inaad ansixiso oo aad martiqaad u dirto ${email}?`)) {
      try {
        // Backend function-ka 'updateProviderStatus'
        await api.patch(`/providers/${id}/status`, { status: 'approved' });
        
        // Farriin muujinaysa in martiqaad loo diray
        alert(`Waa la ansixiyey! Martiqaad ayaa loo diray ${email} si uu password u samaysto.`);
        fetchPendingProviders();
      } catch (error) {
        alert("Ansixinta waa fashilantay.");
      }
    }
  };

  if (loading) return <div className="p-10 text-center">Loading applications...</div>;

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black text-slate-900 mb-8">Codsiyada Cusub (Pending)</h1>
        
        {pendingProviders.length === 0 ? (
          <div className="bg-white p-12 rounded-[2.5rem] text-center border-2 border-dashed border-slate-200">
            <p className="text-slate-500 font-bold text-lg">Ma jiraan codsiyo cusub hadda.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {pendingProviders.map((provider) => (
              <div key={provider._id} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-black text-slate-900">{provider.fullName}</h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-slate-500 font-medium text-sm">
                    <span className="flex items-center gap-1"><FiMail /> {provider.email}</span>
                    <span className="flex items-center gap-1"><FiMapPin /> {provider.location}</span>
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-black uppercase">
                      {provider.serviceType}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleApprove(provider._id, provider.email)}
                    className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-emerald-700 transition-colors"
                  >
                    <FiCheckCircle /> Ansixi & Invite
                  </button>
                  <button className="flex items-center gap-2 bg-rose-50 text-rose-600 px-6 py-3 rounded-2xl font-bold hover:bg-rose-100 transition-colors">
                    <FiXCircle /> Diid
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderVerifications;