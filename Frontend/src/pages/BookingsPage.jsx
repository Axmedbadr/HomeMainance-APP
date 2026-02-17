import React, { useState, useEffect } from 'react';
import api from '../services/api'; 
import { FiCalendar, FiClock, FiMapPin, FiCheck, FiX } from 'react-icons/fi';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllBookings();
  }, []);

  const fetchAllBookings = async () => {
    try {
      setLoading(true);
      const res = await api.get('/bookings/all');
      setBookings(res.data.data || []); 
    } catch (err) {
      console.error("Qalad xogta xaga keenista:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    if (!window.confirm(`Ma hubtaa inaad ballantan ${newStatus === 'approved' ? 'ogolaato' : 'diido'}?`)) return;
    
    try {
      // URL-kan wuxuu saxayaa Error 500 ee console-ka ka muuqday
      const action = newStatus === 'approved' ? 'approve' : 'reject';
      await api.put(`/admin/${action}/${id}`); 
      
      setBookings(prev => 
        prev.map(b => b._id === id ? { ...b, status: newStatus } : b)
      );
      alert(`Si guul leh ayaa loo ${newStatus === 'approved' ? 'ansixiyey' : 'diiday'}!`);
    } catch (err) {
      console.error("Ciladda Server-ka:", err);
      alert("Cilad 500: Server-ka ayaa fashilmay. Hubi in URL-ku yahay /api/admin/approve");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Maamulka <span className="text-blue-600">Ballamaha</span>
          </h1>
          <p className="text-slate-500 font-medium mt-2">Guud ahaan waxaa jira {bookings.length} ballan.</p>
        </header>

        <div className="grid gap-6">
          {bookings.length === 0 ? (
            <div className="bg-white p-12 rounded-[2rem] text-center border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-bold">Wax ballan ah laguma helin.</p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div key={booking._id} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                    {booking.service?.fullName || `Adeegga: ${booking.service?._id?.slice(-6) || 'N/A'}`}
                  </h3>
                  <p className="text-blue-600 font-bold text-sm mb-4">
                    Macmiilka: {booking.userId?.name || "Macmiil aan la aqoon"}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-slate-500 text-sm font-semibold">
                    <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                      <FiCalendar className="text-blue-500" /> {booking.date || 'Lama cayimin'}
                    </span>
                    <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                      <FiClock className="text-blue-500" /> {booking.time || '10:00 AM'}
                    </span>
                    <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                      <FiMapPin className="text-blue-500" /> {booking.address || 'Hargeisa, SL'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center md:items-end gap-3 min-w-[150px]">
                  <div className="text-3xl font-black text-slate-900">${booking.totalPrice || 25}</div>
                  
                  {booking.status === 'pending' ? (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleUpdateStatus(booking._id, 'approved')}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl flex items-center gap-1 text-[11px] font-black transition shadow-sm"
                      >
                        <FiCheck size={16} /> APPROVE
                      </button>
                      <button 
                        onClick={() => handleUpdateStatus(booking._id, 'rejected')}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-xl flex items-center gap-1 text-[11px] font-black transition shadow-sm"
                      >
                        <FiX size={16} /> REJECT
                      </button>
                    </div>
                  ) : (
                    <span className={`px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest border ${
                      booking.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-red-50 text-red-600 border-red-200'
                    }`}>
                      {booking.status}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;