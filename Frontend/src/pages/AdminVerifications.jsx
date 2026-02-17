import React, { useEffect, useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { FiCheckCircle, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const AdminVerifications = () => {
  const [pendingProviders, setPendingProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/pending-providers'); 
      if (response.data && response.data.data) {
        setPendingProviders(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Waa la waayay xogta codsiyada");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleApprove = async (id) => {
    if (!window.confirm("Ma hubtaa inaad ansixiso xirfadlahan?")) return;

    try {
      // Dib ugu noqo URL-ka asalka ah ee Backend-kaaga (maadaama /approve uu 404 bixiyey)
      // Waxaan ku daray xog madhan {} si loo hubiyo in PUT-ga uu si sax ah u gaaro server-ka
      const response = await api.put(`/admin/approve-provider/${id}`, {}); 
      
      if (response.data.success) {
        toast.success("Waa la ansixiyey! Xirfadlaha hadda waa Active.");
        fetchPending(); // Dib u cusboonaysii liiska
      }
    } catch (error) {
      // Halkan waxay hadda soo qabanaysaa haddii 500 uu soo noqdo
      console.error("Approval error detail:", error.response?.data || error.message);
      
      // Haddii error 500 uu jiro, waxay u badan tahay in ID-gu uu ku jirin Database-ka
      const msg = error.response?.status === 500 
        ? "Server Error (500): Hubi haddii Provider-ku database-ka ku jiro" 
        : "Ansixintu ma suurtagalin";
      toast.error(msg);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/admin" className="flex items-center gap-2 text-slate-500 mb-8 hover:text-blue-600 font-bold">
          <FiArrowLeft /> Ku laabo Admin Panel
        </Link>
        
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Codsiyada Cusub</h2>
          <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-bold">
            {pendingProviders.length} Codsi
          </span>
        </div>
        
        <div className="grid gap-6">
          {pendingProviders.length === 0 ? (
            <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-slate-200 shadow-sm">
              <FiCheckCircle size={40} className="text-slate-300 mx-auto mb-6" />
              <p className="text-slate-500 font-bold text-lg">Ma jiraan codsiyo cusub.</p>
            </div>
          ) : (
            pendingProviders.map((provider) => (
              <div key={provider._id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex-1">
                  <h3 className="font-black text-2xl text-slate-900 mb-1">{provider.fullName}</h3>
                  <div className="flex gap-3 items-center text-slate-500 font-medium">
                    <span>{provider.serviceType}</span>
                    <span>•</span>
                    <span>{provider.location}</span>
                  </div>
                  <p className="text-sm text-blue-600 font-bold mt-2">{provider.email}</p>
                </div>
                
                <button 
                  onClick={() => handleApprove(provider._id)}
                  className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-emerald-700 transition-all flex items-center gap-2"
                >
                  <FiCheckCircle size={20} /> Ansixi Codsiga
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminVerifications;