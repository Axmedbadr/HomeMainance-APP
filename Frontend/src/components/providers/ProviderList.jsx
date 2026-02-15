import React from 'react'
import { providerService } from '../../services/providerService'
import ProviderCard from './ProviderCard'
import { FiUsers, FiSearch, FiZap } from 'react-icons/fi'

const ProviderList = () => {
  const [providers, setProviders] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    loadProviders()
  }, [])

  const loadProviders = async () => {
    try {
      setLoading(true)
      const data = await providerService.getAll()
      setProviders(data || []) 
    } catch (error) {
      console.error('Error loading providers:', error)
      setProviders([]) 
    } finally {
      setLoading(false)
    }
  }

  // --- 1. SKELETON LOADING (Markay shaqadu socoto) ---
  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col gap-4 mb-12">
          <div className="h-4 w-32 bg-slate-200 animate-pulse rounded-full"></div>
          <div className="h-10 w-64 bg-slate-200 animate-pulse rounded-xl"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-72 bg-slate-100/50 animate-pulse rounded-[2.5rem] border border-slate-100"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-12">
      {/* --- 2. HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-blue-600 text-white p-2 rounded-xl shadow-lg shadow-blue-500/30">
              <FiZap size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">
              Verified Professionals
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight">
            Expert <span className="text-blue-600">Service</span> Providers
          </h1>
          <p className="text-slate-500 font-medium mt-4 text-lg">
            Discover highly-rated specialists for your home maintenance needs.
          </p>
        </div>

        {/* Counter Card */}
        <div className="bg-white border border-slate-100 shadow-xl shadow-slate-200/50 rounded-3xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
            <FiUsers size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Available Now</p>
            <p className="text-2xl font-black text-slate-900 leading-none">{providers.length} Specialists</p>
          </div>
        </div>
      </div>

      {/* --- 3. MAIN CONTENT GRID --- */}
      {providers.length === 0 ? (
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] py-24 text-center">
          <div className="w-24 h-24 bg-white shadow-xl rounded-full flex items-center justify-center mx-auto mb-6">
            <FiSearch size={32} className="text-slate-300" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-2">No Specialists Found</h3>
          <p className="text-slate-500 max-w-sm mx-auto font-medium">
            We couldn't find any service providers at the moment. Please check back later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {providers.map((provider) => (
            <div 
              key={provider._id} 
              className="transform transition-all duration-500 hover:-translate-y-3"
            >
              <ProviderCard provider={provider} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProviderList