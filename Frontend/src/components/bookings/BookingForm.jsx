// src/components/bookings/BookingList.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { FiCalendar, FiClock, FiMapPin, FiDollarSign, FiCheckCircle, FiXCircle, FiTool, FiArrowRight, FiInfo } from 'react-icons/fi'

const BookingList = ({ bookings, onStatusChange }) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-100/50'
      case 'pending':
        return 'bg-amber-50 text-amber-600 border-amber-100 shadow-amber-100/50'
      case 'confirmed':
        return 'bg-blue-50 text-blue-600 border-blue-100 shadow-blue-100/50'
      case 'cancelled':
        return 'bg-rose-50 text-rose-600 border-rose-100 shadow-rose-100/50'
      default:
        return 'bg-slate-50 text-slate-600 border-slate-100 shadow-slate-100/50'
    }
  }

  const getStatusAction = (status, bookingId) => {
    if (status === 'pending') {
      return (
        <div className="flex gap-2 mt-4 justify-end">
          <button
            onClick={() => onStatusChange(bookingId, 'confirmed')}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
          >
            <FiCheckCircle /> Confirm
          </button>
          <button
            onClick={() => onStatusChange(bookingId, 'cancelled')}
            className="flex items-center gap-1.5 px-4 py-2 bg-white text-rose-600 border border-rose-100 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-rose-50 transition-all"
          >
            <FiXCircle /> Decline
          </button>
        </div>
      )
    }
    return null
  }

  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-16 text-center border border-slate-100">
        <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
          <FiCalendar className="text-slate-300" size={40} />
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">No Appointments Yet</h3>
        <p className="text-slate-500 font-medium mb-8 max-w-xs mx-auto text-sm italic">
          Your service queue is currently empty.
        </p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
        >
          Browse Services <FiArrowRight />
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {bookings.map((booking) => {
        const statusStyle = getStatusStyles(booking.status);
        return (
          <div
            key={booking._id}
            className="group bg-white rounded-[2rem] shadow-xl shadow-slate-200/30 p-8 border border-slate-100 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-200/20"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-8">
              
              {/* Service Icon & Main Info */}
              <div className="flex flex-1 items-start gap-5">
                <div className="bg-slate-50 p-4 rounded-2xl group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors shadow-inner">
                  <FiTool size={28} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">
                      {booking.service?.name || booking.service}
                    </h3>
                    <span className={`px-3 py-1 rounded-lg border text-[9px] font-black uppercase tracking-widest shadow-sm ${statusStyle}`}>
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm font-medium line-clamp-1 max-w-md italic">
                    {booking.service?.description || 'No detailed description available for this service.'}
                  </p>
                </div>
              </div>

              {/* Grid Data (Date, Time, Address) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-[1.5]">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-1">
                    <FiCalendar className="text-blue-500" /> Schedule
                  </p>
                  <p className="text-sm font-bold text-slate-700">{booking.date}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-1">
                    <FiClock className="text-blue-500" /> Arrival Time
                  </p>
                  <p className="text-sm font-bold text-slate-700">{booking.time}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-1">
                    <FiMapPin className="text-blue-500" /> Location
                  </p>
                  <p className="text-xs font-bold text-slate-700 truncate max-w-[150px]">{booking.address}</p>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="lg:text-right border-t lg:border-t-0 lg:border-l border-slate-50 pt-6 lg:pt-0 lg:pl-8 min-w-[140px]">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Fee</p>
                <p className="text-3xl font-black text-slate-900 tracking-tighter mb-2">${booking.totalPrice}</p>
                
                {booking.status === 'completed' && (
                  <div className="flex items-center justify-end gap-1.5 text-emerald-600 text-[10px] font-black uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-lg">
                    <FiCheckCircle /> Success
                  </div>
                )}
                
                {booking.status === 'cancelled' && (
                  <div className="flex items-center justify-end gap-1.5 text-rose-600 text-[10px] font-black uppercase tracking-widest bg-rose-50 px-3 py-1.5 rounded-lg">
                    <FiXCircle /> Revoked
                  </div>
                )}

                {getStatusAction(booking.status, booking._id)}
              </div>

            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BookingList