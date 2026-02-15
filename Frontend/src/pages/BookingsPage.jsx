import React from 'react'
import { useAuth } from '../context/AuthContext'
import { bookingService } from '../services/bookingService'
import { FiCalendar, FiClock, FiMapPin, FiDollarSign, FiCheckCircle, FiXCircle, FiLayers, FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const BookingsPage = () => {
  const { user } = useAuth()
  const [bookings, setBookings] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    loadBookings()
  }, [])

  const loadBookings = async () => {
    try {
      setLoading(true)
      const response = await bookingService.getMyBookings()
      setBookings(response.data || [])
    } catch (error) {
      console.error('Error loading bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusStyles = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100'
      case 'pending':
        return 'bg-amber-50 text-amber-600 border-amber-100'
      case 'cancelled':
        return 'bg-rose-50 text-rose-600 border-rose-100'
      default:
        return 'bg-slate-50 text-slate-600 border-slate-100'
    }
  }

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#f8fafc]">
        <div className="w-16 h-16 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em]">Syncing Your Bookings</p>
      </div>
    )
  }

  if (bookings.length === 0) {
    return (
      <div className="container py-24 px-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 p-16 text-center border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 text-slate-50/50 -rotate-12 translate-x-10 -translate-y-10">
             <FiCalendar size={200} />
          </div>
          <div className="relative z-10">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <FiLayers className="text-slate-300" size={40} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">No Bookings Found</h2>
            <p className="text-slate-500 font-medium mb-10 max-w-sm mx-auto">
              Your schedule is currently empty. Start exploring our premium services today!
            </p>
            <Link
              to="/services"
              className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
            >
              Explore Services <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-24">
      {/* Header Section */}
      <div className="bg-[#0a0f1d] pt-16 pb-32 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">Order History</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
                My <span className="text-blue-500">Bookings</span>
              </h1>
            </div>
            <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl backdrop-blur-md">
               <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Total Orders</p>
               <p className="text-2xl font-black text-white leading-none">{bookings.length} Services</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="container mx-auto px-6 -mt-16 max-w-5xl">
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="group bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 p-8 border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-200/30 hover:-translate-y-1"
            >
              <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                      {booking.service?.name || booking.service}
                    </h3>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyles(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-slate-500 font-bold text-sm">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-blue-600 shadow-sm">
                        <FiCalendar size={14} />
                      </div>
                      {booking.date}
                    </div>
                    <div className="flex items-center gap-3 text-slate-500 font-bold text-sm">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-blue-600 shadow-sm">
                        <FiClock size={14} />
                      </div>
                      {booking.time}
                    </div>
                    <div className="flex items-center gap-3 text-slate-500 font-bold text-sm sm:col-span-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-blue-600 shadow-sm flex-shrink-0">
                        <FiMapPin size={14} />
                      </div>
                      <span className="truncate">{booking.address}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:items-end justify-between border-t lg:border-t-0 lg:border-l border-slate-50 pt-6 lg:pt-0 lg:pl-10">
                  <div className="mb-6">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 text-left lg:text-right">Total Amount</p>
                    <p className="text-3xl font-black text-slate-900 leading-none">${booking.totalPrice}</p>
                  </div>

                  {booking.status === 'completed' && (
                    <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-xl">
                      <FiCheckCircle size={14} />
                      Service Delivered
                    </div>
                  )}

                  {booking.status === 'cancelled' && (
                    <div className="flex items-center gap-2 text-rose-600 font-black text-[10px] uppercase tracking-widest bg-rose-50 px-4 py-2 rounded-xl">
                      <FiXCircle size={14} />
                      Order Revoked
                    </div>
                  )}
                  
                  {booking.status === 'pending' && (
                    <div className="flex items-center gap-2 text-amber-600 font-black text-[10px] uppercase tracking-widest bg-amber-50 px-4 py-2 rounded-xl">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
                      Awaiting Response
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BookingsPage