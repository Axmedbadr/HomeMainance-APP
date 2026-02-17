import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiAlertTriangle, FiSend } from 'react-icons/fi';
import api from '../../services/api'; // Hubi path-kaaga api-ga

const ComplaintForm = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [reason, setReason] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/bookings/${bookingId}/complaint`, { reason, comment });
      alert("Cabashadaada waa la gudbiyay. Maamulka ayaa dib kuugu soo jawaabi doona.");
      navigate('/bookings');
    } catch (error) {
      alert("Cillad ayaa dhacday, fadlan dib u tijaabi.");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-6">
      <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-50">
        <div className="flex items-center gap-3 mb-6 text-rose-600">
          <FiAlertTriangle size={32} />
          <h2 className="text-2xl font-black tracking-tight">Gudbi Cabasho</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase text-slate-400 mb-2">Maxaad ka cabanaysaa?</label>
            <select 
              required
              className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="">Dooro sabab...</option>
              <option value="Shaqo xumo">Shaqo xumo (Quality)</option>
              <option value="Daahid">Aad ayuu u daahay</option>
              <option value="Anshax xumo">Anshax xumo</option>
              <option value="Qiimo xad dhaaf ah">Qiimo dheeraad ah</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-slate-400 mb-2">Sharaxaad kooban</label>
            <textarea 
              required
              rows="4"
              className="w-full p-4 bg-slate-50 rounded-2xl border-none font-medium"
              placeholder="Fadlan noo sheeg waxa dhacay..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>

          <button type="submit" className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-rose-600 transition-all flex items-center justify-center gap-2">
            <FiSend /> Dir Cabashada
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;