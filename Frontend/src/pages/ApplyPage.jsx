import React, { useState } from 'react';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

const ApplyPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceType: '',
    location: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Codsigaaga waa la dirayaa...");
    try {
      const response = await authService.applyAsProvider(formData);
      if (response.success) {
        toast.success(response.message || "Codsigaaga si guul leh ayaa loo diray!", { id: loadingToast });
        // Halkan foomka waa lagu faaruqinayaa
        setFormData({ fullName: '', email: '', phone: '', serviceType: '', location: '' });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Cilad ayaa dhacday", { id: loadingToast });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Codso Noqoshada Provider</h2>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Magacaaga oo dhammaystiran"
            value={formData.fullName} // Ku dar value
            required
            className="w-full px-3 py-2 border rounded-md"
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
          />
          <input
            type="email"
            placeholder="Email-kaaga"
            value={formData.email} // Ku dar value
            required
            className="w-full px-3 py-2 border rounded-md"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input
            type="text"
            placeholder="Lambarka Taleefanka"
            value={formData.phone} // Ku dar value
            required
            className="w-full px-3 py-2 border rounded-md"
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
          <select 
            className="w-full px-3 py-2 border rounded-md"
            value={formData.serviceType} // Ku dar value
            onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
            required
          >
            <option value="">Dooro Adeeggaaga</option>
            <option value="Plumbing">Plumbing (Tuubiste)</option>
            <option value="Electrical">Electrical (Laydh)</option>
            <option value="Cleaning">Cleaning (Nadiifin)</option>
          </select>
          <input
            type="text"
            placeholder="Goobta aad deggan tahay (Location)"
            value={formData.location} // Ku dar value
            required
            className="w-full px-3 py-2 border rounded-md"
            onChange={(e) => setFormData({...formData, location: e.target.value})}
          />
          <button type="submit" className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors font-bold uppercase tracking-wider">
            Gali Codsiga
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyPage;