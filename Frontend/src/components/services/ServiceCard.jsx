import React from 'react'
import { Link } from 'react-router-dom'
import { FiStar, FiArrowRight, FiBox, FiUser } from 'react-icons/fi'

const ServiceCard = ({ service }) => {
  const averageRating = service.reviews?.length > 0 
    ? service.reviews.reduce((sum, r) => sum + r.rating, 0) / service.reviews.length 
    : 0

  return (
    <div className="group bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-200/50">
      
      {/* Service Image / Icon Section */}
      <div className="relative h-44 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center overflow-hidden">
        {/* Animated Background Pulse */}
        <div className="absolute inset-0 bg-blue-600/5 scale-0 group-hover:scale-100 transition-transform duration-700 rounded-full"></div>
        
        <FiBox className="text-6xl text-slate-300 group-hover:scale-110 group-hover:text-blue-500 transition-all duration-500 relative z-10" />
        
        {/* Floating Price Badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm border border-slate-100">
            <span className="text-blue-600 font-black text-sm">${service.price}</span>
          </div>
        </div>
      </div>

      {/* Service Info Body */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md">
            {service.category || 'Maintenance'}
          </span>
          <div className="flex items-center ml-auto">
            <FiStar className="text-yellow-400 fill-current" size={14} />
            <span className="text-slate-900 font-black text-xs ml-1">{averageRating.toFixed(1)}</span>
            <span className="text-slate-400 text-[10px] ml-1">({service.reviews?.length || 0})</span>
          </div>
        </div>

        <h3 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors mb-2">
          {service.name}
        </h3>

        <p className="text-slate-500 text-xs font-medium leading-relaxed mb-6 line-clamp-2 italic">
          "{service.description || 'Professional home maintenance service tailored to your needs.'}"
        </p>

        {/* Provider Section */}
        {service.provider && (
          <div className="flex items-center gap-3 mb-6 p-2 bg-slate-50 rounded-xl border border-slate-100 group-hover:bg-white group-hover:border-blue-100 transition-all">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-400 shadow-sm">
              <FiUser size={14} />
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Specialist</p>
              <p className="text-xs font-bold text-slate-800">{service.provider.name}</p>
            </div>
          </div>
        )}

        {/* Action Button */}
        <Link
          to={`/services/${service._id}`}
          className="group/btn flex items-center justify-between w-full bg-slate-900 text-white px-5 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all duration-300"
        >
          <span>View Details</span>
          <FiArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  )
}

export default ServiceCard