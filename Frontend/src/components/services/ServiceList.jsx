import React from 'react';
import { Link } from 'react-router-dom';
import serviceService from '../../services/serviceService';
import ServiceCard from './ServiceCard';
import { FiAlertCircle, FiInbox, FiArrowRight } from 'react-icons/fi';

const ServiceList = ({ limit, showAllLink = false }) => {
  const [services, setServices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const response = await serviceService.getAll();
      
      let data = response.data ? response.data : response;

      if (data && data.data && Array.isArray(data.data)) {
        data = data.data;
      }

      const finalData = Array.isArray(data) ? data : [];
      setServices(limit ? finalData.slice(0, limit) : finalData);
      setError(null);
    } catch (error) {
      console.error('Error loading services:', error);
      setError('Failed to sync with the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // --- PREMIUM SKELETON LOADING ---
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(limit || 6)].map((_, i) => (
          <div key={i} className="relative overflow-hidden bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-50 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
            <div className="w-full h-52 bg-slate-100 rounded-3xl mb-6"></div>
            <div className="h-6 bg-slate-100 rounded-full w-3/4 mb-4"></div>
            <div className="h-4 bg-slate-100 rounded-full w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  // --- ELEGANT ERROR STATE ---
  if (error) {
    return (
      <div className="py-20 flex flex-col items-center text-center max-w-sm mx-auto">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-red-500/10">
          <FiAlertCircle size={40} />
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-2">Sync Failed</h3>
        <p className="text-slate-500 font-medium mb-8">{error}</p>
        <button 
          onClick={loadServices}
          className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all"
        >
          Try Refreshing
        </button>
      </div>
    );
  }

  // --- MINIMALIST EMPTY STATE ---
  if (services.length === 0) {
    return (
      <div className="py-24 bg-white rounded-[4rem] border-2 border-dashed border-slate-100 text-center">
        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <FiInbox className="text-slate-300" size={48} />
        </div>
        <h3 className="text-3xl font-black text-slate-900 mb-3">No Services Available</h3>
        <p className="text-slate-500 max-w-xs mx-auto font-medium leading-relaxed">
          We’re currently onboarding new experts. Check back soon for updates.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* Services Grid with Smooth Hover Effects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <div 
            key={service._id} 
            className="group relative"
            style={{ 
              animation: `fadeInUp 0.6s ease-out forwards ${index * 0.1}s`,
              opacity: 0 
            }}
          >
            {/* Soft Glow Behind Card */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative">
              <ServiceCard service={service} />
            </div>
          </div>
        ))}
      </div>

      {/* Modern Show All Action */}
      {showAllLink && services.length >= limit && (
        <div className="flex justify-center pt-8">
          <Link
            to="/services"
            className="group flex items-center gap-4 px-12 py-5 bg-[#0a192f] text-white rounded-[2rem] font-black hover:bg-blue-600 transition-all shadow-2xl shadow-blue-900/20"
          >
            Explore Full Catalog
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all">
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      )}

      {/* CSS For Animations (Add this to your index.css or a style tag) */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default ServiceList;