import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiLock, FiSettings, FiHome } from 'react-icons/fi'; // Waxaan ku daray FiHome
import { useAuth } from '../../context/AuthContext'; 
import toast from 'react-hot-toast';

const ServiceCard = ({ service }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handlePush = () => {
    if (isAuthenticated) {
      const type = encodeURIComponent(service.name);
      navigate(`/providers?serviceType=${type}&serviceId=${service._id}`);
    } else {
      toast.error("Authentication required to access specialists.");
      navigate('/register');
    }
  };

  return (
    <div className="group relative bg-white rounded-[3rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden transition-all duration-500 hover:shadow-[0_40px_80px_rgba(14,165,233,0.12)] hover:-translate-y-3 flex flex-col items-center text-center">
      
      {/* Decorative Accent - Light Blue Circle */}
      <div className="absolute top-[-10%] right-[-10%] w-48 h-48 bg-sky-50 rounded-full -z-0 group-hover:bg-sky-100/50 transition-colors duration-500"></div>

      <div className="p-12 relative z-10 w-full flex flex-col items-center">
        
        {/* Category Icon - Home Icon Blue Theme */}
        <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl transition-all duration-500 ${
          isAuthenticated 
          ? 'bg-sky-500 text-white shadow-sky-200 group-hover:rotate-12 group-hover:scale-110' 
          : 'bg-slate-100 text-slate-400'
        }`}>
          {isAuthenticated ? <FiHome size={32} /> : <FiSettings size={32} />}
        </div>

        {/* Title & Category - Bold & Centered */}
        <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tighter leading-tight">
          {service.name}
        </h3>
        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 mb-12">
          Professional Category
        </p>
        
        {/* Main Button - Styled like "Verify Portfolio" */}
        <button
          onClick={handlePush}
          className={`flex items-center justify-between w-full px-10 py-6 rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.3em] transition-all duration-500 group/btn shadow-2xl ${
            isAuthenticated 
              ? "bg-[#0077b6] text-white hover:bg-[#023e8a] shadow-sky-200" 
              : "bg-slate-100 text-slate-400 border border-slate-200"
          }`}
        >
          <span className="relative z-10">
            {isAuthenticated ? "Explore Specialists" : "Access Restricted"}
          </span>
          
          {/* Circular Arrow Container */}
          <div className={`p-3 rounded-full transition-all duration-500 ${
            isAuthenticated ? 'bg-white/20 group-hover/btn:bg-white/30' : 'bg-slate-200'
          }`}>
            {isAuthenticated ? (
              <FiArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            ) : (
              <FiLock size={16} />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;