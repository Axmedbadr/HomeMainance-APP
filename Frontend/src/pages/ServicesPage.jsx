import React from 'react'
import ServiceList from '../components/services/ServiceList'
import { FiArrowRight, FiActivity } from 'react-icons/fi'

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 font-sans selection:bg-blue-100">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-12 pb-16 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] animate-pulse"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-md border border-blue-100 px-6 py-2 rounded-full shadow-sm">
              <FiActivity className="text-blue-600 animate-spin-slow" />
              <span className="text-blue-800 text-[11px] font-black uppercase tracking-[0.3em]">Premium Catalog 2026</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.95]">
              Tailored <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">
                Home Solutions
              </span>
            </h1>
            
            <p className="text-slate-500 text-base md:text-lg font-medium max-w-xl mx-auto leading-relaxed italic">
              Experience a new standard of home maintenance with our 
              <span className="text-blue-600 font-black not-italic"> elite network </span> 
              of verified professionals.
            </p>
          </div>
        </div>
      </section>

      {/* --- SERVICES GRID SECTION --- */}
      <section className="container mx-auto px-6 relative">
        <div className="bg-white/70 backdrop-blur-3xl rounded-[3.5rem] p-8 md:p-16 border border-white shadow-[0_32px_64px_-15px_rgba(0,0,0,0.05)]">
          
          <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-100 pb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Available Specialists</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Live Updates: Today 2:20 PM</p>
              </div>
            </div>
            <div className="px-5 py-2.5 bg-slate-100 rounded-xl text-slate-600 text-[10px] font-black uppercase tracking-wider border border-slate-200">
                Reliable Experts
            </div>
          </div>

          <div className="relative z-10">
            <ServiceList />
          </div>
        </div>
      </section>

      {/* --- INFO: Qaybtii "Contact Support" waa laga saaray halkan --- */}

      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}</style>
    </div>
  )
}

export default ServicesPage;