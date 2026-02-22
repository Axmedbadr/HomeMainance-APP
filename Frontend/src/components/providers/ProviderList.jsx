import React, { useState, useEffect } from 'react'; 
import { useSearchParams } from 'react-router-dom';
import api from '../../services/api'; 
import ProviderCard from './ProviderCard'; 
import { FiSearch, FiZap } from 'react-icons/fi';

const ProviderList = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const serviceIdFromUrl = searchParams.get('serviceId');
  const serviceNameFromUrl = searchParams.get('serviceType');

  useEffect(() => {
    const loadProviders = async () => {
      try {
        setLoading(true);
        
        // 1. Marka hore soo qaado dhammaan khubarada
        const res = await api.get('/users/providers'); 
        
        if (res.data && res.data.success) {
          let allData = res.data.data || [];

          // 2. DEBUGGING: Fiiri console-ka biraawsarkaaga si aad u aragto farqiga
          console.log("URL Name:", serviceNameFromUrl);
          console.log("DB Data Sample:", allData[0]?.serviceType);

          // 3. FILTERING LOGIC
          if (serviceNameFromUrl || serviceIdFromUrl) {
            allData = allData.filter(provider => {
              const pType = (provider.serviceType || "").toLowerCase();
              const pId = String(provider.serviceId || "");
              
              const searchName = (serviceNameFromUrl || "").toLowerCase();
              const searchId = String(serviceIdFromUrl || "");

              // XALKA CILADDA: Waxaan isticmaaleynaa .includes() 
              // si "Hagaajinta Tuubooyinka (Plumbing)" ay u hesho "plumbing"
              const isMatch = 
                (searchId && pId === searchId) || 
                (searchName && pType !== "" && searchName.includes(pType)) || 
                (searchName && pType !== "" && pType.includes(searchName));

              return isMatch;
            });
          }

          setProviders(allData);
        }
      } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProviders();
  }, [serviceNameFromUrl, serviceIdFromUrl]); 

  if (loading) return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-sky-500 border-t-transparent"></div>
    </div>
  );

  return (
    <div className="container mx-auto px-6 pt-10 pb-20">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black text-slate-900">
          {serviceNameFromUrl || 'Dhammaan Khubarada'} <span className="text-sky-500 italic">Directory</span>
        </h1>
        <div className="bg-white px-6 py-3 rounded-2xl shadow-lg border border-sky-50 flex items-center gap-3">
          <FiZap className="text-sky-500" />
          <span className="font-bold">{providers.length} Diyaar ah</span>
        </div>
      </div>

      {providers.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
          <FiSearch size={40} className="mx-auto text-slate-200 mb-4" />
          <h3 className="text-xl font-bold text-slate-800">Ma jiro shaqaale loo helay</h3>
          <p className="text-slate-400">Qaybta: "{serviceNameFromUrl}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {providers.map((p) => <ProviderCard key={p._id} provider={p} />)}
        </div>
      )}
    </div>
  );
};

export default ProviderList;