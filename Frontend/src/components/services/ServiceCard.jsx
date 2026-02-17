import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiArrowRight, FiBox } from 'react-icons/fi';

const ServiceCard = ({ service }) => {
  return (
    <div className="group bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden transition-all duration-500">
      <div className="p-6">
        <h3 className="text-xl font-black text-slate-900 mb-2">{service.name}</h3>
        
        {/* URL-ka wuxuu hadda xambaarsan yahay ID-ga iyo Magaca Adeegga */}
        <Link
          to={`/providers?serviceType=${service.name}&serviceId=${service._id}`}
          className="flex items-center justify-between w-full bg-slate-900 text-white px-5 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all duration-300"
        >
          <span>View Specialists</span>
          <FiArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;