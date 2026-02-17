import React from 'react'
import { useLocation } from 'react-router-dom'
import { providerService } from '../../services/providerService'
import ProviderCard from './ProviderCard'
import { FiSearch } from 'react-icons/fi'

const ProviderList = () => {
  const [providers, setProviders] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  // Decoding URL (%20 to space)
  const rawCategory = queryParams.get('serviceType'); 
  const selectedCategory = rawCategory ? decodeURIComponent(rawCategory) : null;
  const serviceId = queryParams.get('serviceId'); 

  React.useEffect(() => {
    const loadProviders = async () => {
      try {
        setLoading(true)
        const data = await providerService.getAll()
        setProviders(data || []) 
      } catch (error) {
        console.error('Error loading providers:', error)
      } finally {
        setLoading(false)
      }
    }
    loadProviders()
  }, [])

  const filteredProviders = providers.filter(provider => {
    if (!selectedCategory) return true;
    if (!provider?.serviceType) return false;

    // Isbarbardhigga rasmiga ah (Axmed Cali match)
    const pType = provider.serviceType.toLowerCase().trim();
    const sType = selectedCategory.toLowerCase().trim();
    
    return pType.includes(sType) || sType.includes(pType);
  });

  if (loading) return <div className="p-12 text-center">Loading Specialists...</div>

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-black mb-8">
        {selectedCategory ? `Khubaro: ${selectedCategory}` : 'Dhamaan Khubarada'}
      </h1>

      {filteredProviders.length === 0 ? (
        <div className="py-24 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed">
          <FiSearch size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-bold">Ma jiro qof hadda diyaar ah</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProviders.map((provider) => (
            <ProviderCard 
              key={provider._id} 
              provider={provider} 
              serviceId={serviceId} 
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProviderList