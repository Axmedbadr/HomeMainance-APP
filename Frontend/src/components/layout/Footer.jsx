import React from 'react'
import { FiFacebook, FiTwitter, FiInstagram, FiPhone, FiMapPin, FiActivity } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="bg-[#0a0f1d] text-slate-400 py-10 border-t border-white/5">
    
      <div className="max-w-6xl mx-auto px-10 md:px-16">
        
     
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          
      
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg shadow-lg shadow-blue-600/20">
              <FiActivity size={16} />
            </div>
            <span className="text-lg font-black text-white italic tracking-tighter">
              Home <span className="text-blue-500">Maintenance</span>
            </span>
          </div>

         
          <nav className="flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.15em]">
            <a href="/services" className="text-white/90 hover:text-blue-500 transition-colors">Services</a>
            <a href="/faq" className="text-white/90 hover:text-blue-500 transition-colors">Help</a>
            <a href="/privacy" className="text-white/90 hover:text-blue-500 transition-colors">Privacy</a>
          </nav>

         
          <div className="flex items-center gap-10">
            <div className="hidden lg:flex items-center gap-6 text-[11px] font-medium text-white/80">
              <span className="flex items-center gap-2">
                <FiMapPin className="text-blue-500"/> Hargeisa, SL
              </span>
              <span className="flex items-center gap-2">
                <FiPhone className="text-blue-500"/> +252 63 4666778
              </span>
            </div>
            <div className="flex gap-3">
              {[FiFacebook, FiTwitter, FiInstagram].map((Icon, i) => (
                <a key={i} href="#" className="p-2.5 bg-white/5 text-white/70 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

      
        <div className="mt-12 pt-6 border-t border-white/[0.05] flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
          <p>© {new Date().getFullYear()} PROHUB GLOBAL</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Security</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;