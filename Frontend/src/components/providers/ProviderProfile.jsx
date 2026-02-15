import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { providerService, serviceService } from '../../services'
import { FiArrowLeft, FiPhone, FiMapPin, FiStar, FiCheckCircle, FiInfo, FiActivity, FiLayers } from 'react-icons/fi'
import ServiceCard from '../services/ServiceCard'

const ProviderProfile = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [provider, setProvider] = React.useState(null)
  const [services, setServices] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    loadProvider()
  }, [id])

  const loadProvider = async () => {
    try {
      setLoading(true)
      const [providerRes, servicesRes] = await Promise.all([
        providerService.getById(id),
        serviceService.getByProvider(id)
      ])

      const pData = providerRes.data || providerRes; 
      setProvider(pData);
      setServices(servicesRes.data || servicesRes || []);
      
    } catch (error) {
      console.error('Error loading provider:', error)
    } finally {
      setLoading(false)
    }
  }

  // --- 1. SKELETON LOADING (Elite Style) ---
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
          <FiActivity className="absolute inset-0 m-auto text-blue-600 animate-pulse" size={24} />
        </div>
        <p className="mt-6 text-slate-500 font-black uppercase tracking-[0.3em] text-[10px]">Loading Profile</p>
      </div>
    )
  }

  // --- 2. ERROR STATE ---
  if (!provider) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200 text-center border border-slate-100">
           <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiInfo size={40} />
           </div>
           <h2 className="text-2xl font-black text-slate-900 mb-2">Provider Not Found</h2>
           <p className="text-slate-500 font-medium mb-8">The specialist you are looking for might have been moved or removed.</p>
           <button onClick={() => navigate(-1)} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all">
             Go Back Home
           </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-24">
      {/* Dynamic Header Banner */}
      <div className="bg-[#0a0f1d] pt-16 pb-40 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[120px] rounded-full translate-x-1/2"></div>
        <div className="container mx-auto relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 text-white/60 hover:text-white transition-all"
          >
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all">
               <FiArrowLeft size={18} />
            </div>
            <span className="font-black text-[10px] uppercase tracking-widest">Back to Directory</span>
          </button>
        </div>
      </div>

      {/* Main Profile Card */}
      <div className="container mx-auto px-6 -mt-28 relative z-20">
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/60 overflow-hidden border border-slate-100">
          <div className="p-8 md:p-14">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                   <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">{provider.fullName}</h1>
                   {provider.status === 'approved' && (
                     <div className="bg-blue-600 text-white p-1 rounded-full shadow-lg shadow-blue-500/40">
                        <FiCheckCircle size={24} />
                     </div>
                   )}
                </div>
                
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-5 py-2 rounded-2xl border border-blue-100 mb-8">
                   <FiLayers size={16} />
                   <span className="font-black text-xs uppercase tracking-widest">{provider.serviceType}</span>
                </div>
                
                {/* Info Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-[1.5rem] border border-slate-100 group hover:bg-white hover:shadow-md transition-all">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                       <FiPhone size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Contact</p>
                      <p className="font-bold text-slate-700">{provider.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-[1.5rem] border border-slate-100 group hover:bg-white hover:shadow-md transition-all">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                       <FiMapPin size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Location</p>
                      <p className="font-bold text-slate-700">{provider.location || 'Hargeisa, SL'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-[1.5rem] border border-slate-100 group hover:bg-white hover:shadow-md transition-all">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-yellow-500 group-hover:bg-yellow-500 group-hover:text-white transition-all">
                       <FiStar size={18} className="fill-current" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Rating</p>
                      <p className="font-bold text-slate-700">{provider.rating || '4.8'} / 5.0</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-start lg:items-end">
                <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                  provider.isAvailable ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'
                }`}>
                  <span className={`w-2.5 h-2.5 rounded-full ${provider.isAvailable ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                  {provider.isAvailable ? 'Available Now' : 'Currently Busy'}
                </div>
              </div>
            </div>

            {/* About / Bio Section */}
            <div className="mt-16">
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                 <h3 className="text-xl font-black text-slate-900 tracking-tight">Professional Bio</h3>
               </div>
               <p className="text-slate-500 text-lg leading-relaxed max-w-4xl font-medium italic">
                 "{provider.bio || 'This specialist has not provided a detailed biography yet, but is verified and ready to assist you with high-quality service.'}"
               </p>
            </div>
          </div>
        </div>

        {/* Services List Section */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-10 px-4">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Provided <span className="text-blue-600">Services</span>
              </h2>
              <p className="text-slate-500 font-medium mt-1">Specialized tasks managed by this provider.</p>
            </div>
            <div className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-black">
              {services.length} Total
            </div>
          </div>

          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service._id} className="transition-all duration-500 hover:-translate-y-3">
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-[3rem] py-20 text-center">
                <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                   <FiLayers className="text-slate-300" size={40} />
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-2">No Services Listed</h4>
                <p className="text-slate-500 font-medium">This provider hasn't added specific service packages yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProviderProfile