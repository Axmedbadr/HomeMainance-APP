import React from 'react'
import ServiceList from '../components/services/ServiceList'
import { FiSearch, FiFilter, FiArrowRight, FiActivity } from 'react-icons/fi'

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 font-sans selection:bg-blue-100">
      
      {/* --- HERO SECTION: (Sare u qaadis) --- */}
      <section className="relative pt-12 pb-16 overflow-hidden"> {/* Padding-ka waa la yareeyey */}
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] animate-pulse"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6"> {/* Space-y waa la yareeyey */}
            
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

            <div className="mt-8 flex flex-col md:flex-row gap-4 max-w-3xl mx-auto p-2 bg-white/60 backdrop-blur-2xl rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-white">
              <div className="flex-1 relative">
                {/* <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} /> */}
                {/* <input 
                  type="text" 
                  placeholder="What can we fix for you today?" 
                  className="w-full pl-16 pr-6 py-4 bg-transparent outline-none font-bold text-slate-800"
                /> */     }
              </div>
              {/* <button className="px-10 py-4 bg-slate-900 text-white rounded-[2rem] font-black flex items-center justify-center gap-3 hover:bg-blue-600 transition-all">
                <FiFilter />
                Refine
              </button> */}
            </div>
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

      {/* --- HELP CTA: (Sare u qaadis) --- */}
      <section className="container mx-auto px-6 mt-16"> {/* mt-32 waxaa loo beddelay mt-16 */}
        <div className="bg-[#0a192f] rounded-[3rem] p-12 text-center relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
              Looking for something <span className="text-blue-400 italic">exclusive?</span>
            </h3>
            <p className="text-slate-400 text-base font-medium">
              Our concierge support is standing by to match you with the perfect specialist for your custom project.
            </p>
            <div className="pt-4">
              <button className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-500 transition-all flex items-center gap-3 mx-auto">
                Contact Support <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}</style>
    </div>
  )
}

export default ServicesPage