import React from 'react';
import { Link } from 'react-router-dom';
import { FiTool, FiClock, FiShield, FiStar, FiChevronRight } from 'react-icons/fi';
import ServiceList from '../components/services/ServiceList';

const Home = () => {
  return (
    <div className="bg-[#f4f7fa] min-h-screen font-sans antialiased text-[#1a2b4b]">
      
      {/* --- HERO SECTION --- */}
      <section className="relative p-4 md:p-8"> 
        <div className="relative overflow-hidden bg-[#0a192f] rounded-[2.5rem] md:rounded-[4rem] min-h-[85vh] flex items-center shadow-2xl">
          <div className="absolute top-0 right-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_top_right,_#1e3a8a,_transparent)]"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>

          <div className="container mx-auto px-8 md:px-16 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 py-12">
                <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  <span className="text-blue-100 text-[10px] font-bold tracking-[0.3em] uppercase">Premier Excellence</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight">
                  Modern Care <br />
                  <span className="text-[#3b82f6]">For Modern</span> <br />
                  Lifestyles.
                </h1>
                
                <p className="text-slate-400 text-lg max-w-md leading-relaxed font-medium">
                  Experience the next generation of home maintenance. Verified professionals, seamless booking, and unmatched quality.
                </p>
                
                <div className="flex flex-wrap gap-5 pt-4">
                  <Link to="/services" className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center group">
                    Explore Services
                    <FiChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/register" className="px-10 py-4 bg-transparent border border-white/20 text-white rounded-2xl font-bold hover:bg-white/10 transition-all">
                    Get Started
                  </Link>
                </div>
              </div>

              <div className="hidden lg:block relative">
                <div className="bg-white/5 border border-white/10 p-4 rounded-[3rem] backdrop-blur-xl rotate-3 shadow-2xl">
                   <div className="bg-[#0f172a] rounded-[2.5rem] p-8 grid grid-cols-2 gap-4">
                      <div className="h-32 bg-blue-600/20 rounded-2xl border border-blue-500/20 flex items-center justify-center text-4xl">🛠️</div>
                      <div className="h-32 bg-indigo-600/20 rounded-2xl border border-indigo-500/20 flex items-center justify-center text-4xl">⚡</div>
                      <div className="h-32 bg-slate-800 rounded-2xl border border-white/5 flex items-center justify-center text-4xl">🚿</div>
                      <div className="h-32 bg-blue-500 rounded-2xl flex items-center justify-center text-4xl">🏠</div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-3xl font-black tracking-tight leading-none">Why Us?</h2>
              <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
              <p className="text-slate-500 text-sm font-medium">Elevating home standards with precision and trust.</p>
            </div>
            
            <FeatureItem icon={FiShield} title="Trusted Pros" desc="Vetted & verified experts." />
            <FeatureItem icon={FiClock} title="Swift Booking" desc="Fast and easy scheduling." />
            <FeatureItem icon={FiStar} title="Top Quality" desc="Rated 4.9/5 by users." />
          </div>
        </div>
      </section>

      {/* --- SERVICES LIST SECTION --- */}
      <section className="px-4 md:px-8 pb-12">
        <div className="bg-white rounded-[3rem] md:rounded-[5rem] py-20 px-8 md:px-16 shadow-sm border border-slate-100">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl space-y-2">
              <h2 className="text-4xl font-black tracking-tight">Featured Services</h2>
              <p className="text-slate-500 font-medium">Choose a category to find your specialist.</p>
            </div>
            <Link to="/services" className="text-blue-600 font-bold flex items-center gap-2 group hover:gap-4 transition-all">
              View All <FiChevronRight />
            </Link>
          </div>
          
          <div className="relative z-10">
            {/* Tallaabada 2aad: Waxaan halkan ku darnay isHome={true} */}
            <ServiceList limit={6} isHome={true} />
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-slate-400 text-[10px] uppercase tracking-[0.4em]">
        © 2026 Premium Home Maintenance • Quality Guaranteed
      </footer>
    </div>
  );
};

const FeatureItem = ({ icon: Icon, title, desc }) => (
  <div className="bg-white p-8 rounded-[2rem] border border-slate-50 shadow-sm hover:shadow-md transition-all group">
    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
      <Icon className="text-blue-600 group-hover:text-white" size={24} />
    </div>
    <h3 className="text-lg font-bold mb-1 tracking-tight">{title}</h3>
    <p className="text-slate-500 text-xs font-medium">{desc}</p>
  </div>
);

export default Home;