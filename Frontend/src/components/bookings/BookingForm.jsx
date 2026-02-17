import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const BookingForm = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    address: '',
    description: ''
  });

  // Tijaabo: Hubi haddii user-ku jiro marka bogga la furo
  useEffect(() => {
    console.log("Hadda login waxaa ku jira:", user); // Ka eeg Inspect -> Console
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Safety Check: Haddii uusan user-ku jirin, ha u oggolaan inuu ballan qabsado
    if (!user || (!user._id && !user.id)) {
      toast.error("Fadlan markale Login soo samee, xogtaada lama hayo.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      // Payload-ka saxda ah ee xallinaya "userId is required"
      const bookingData = {
        userId: user._id || user.id, // Server-ku kan ayuu u baahan yahay
        service: providerId,
        date: formData.date,
        time: formData.time,
        address: formData.address,
        description: formData.description || "Ma jirto sharaxaad la bixiyey.",
        totalPrice: 25 // Tan ayaa xallinaysa $0
      };

      console.log("Xogta loo dirayo Server-ka:", bookingData);

      const response = await axios.post('http://localhost:5006/api/bookings', bookingData, config);

      if (response.data.success) {
        toast.success('Ballanta si guul leh ayaa loo qabtay!');
        navigate('/bookings'); 
      }
    } catch (error) {
      // Qabashada 500 Error-ka
      const errorMsg = error.response?.data?.message || 'Cillad ayaa dhacday server-ka';
      toast.error(errorMsg);
      console.error("Booking Error Details:", error.response?.data);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-10 bg-white rounded-[2.5rem] shadow-2xl mt-10 border border-gray-100">
      <h2 className="text-3xl font-black mb-8 text-center text-gray-800 italic tracking-tighter">Confirm Booking</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">Appointment Date</label>
          <input type="date" name="date" required onChange={handleChange} className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-bold text-gray-700" />
        </div>
        
        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">Preferred Time</label>
          <input type="time" name="time" required onChange={handleChange} className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-bold text-gray-700" />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">Service Address</label>
          <input type="text" name="address" placeholder="e.g. Boqoljire, Hargeisa" required onChange={handleChange} className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-semibold" />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">Additional Notes</label>
          <textarea name="description" placeholder="Describe the problem..." onChange={handleChange} className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all h-28" />
        </div>

        <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl active:scale-95 mt-4">
          Booking Now
        </button>
      </form>
    </div>
  );
};

export default BookingForm;