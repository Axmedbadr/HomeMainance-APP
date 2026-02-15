// src/components/bookings/BookingStatus.jsx
import React from 'react'
import { FiCheckCircle, FiClock, FiXCircle, FiActivity } from 'react-icons/fi'

const BookingStatus = ({ status }) => {
  const statusConfig = {
    pending: {
      icon: FiClock,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-100',
      dot: 'bg-amber-500',
      label: 'Awaiting Approval',
      description: 'Your request is in queue for verification.',
    },
    confirmed: {
      icon: FiActivity,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      dot: 'bg-blue-500',
      label: 'Confirmed',
      description: 'Provider is scheduled for arrival.',
    },
    completed: {
      icon: FiCheckCircle,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
      dot: 'bg-emerald-500',
      label: 'Service Completed',
      description: 'Successfully delivered and finalized.',
    },
    cancelled: {
      icon: FiXCircle,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      border: 'border-rose-100',
      dot: 'bg-rose-500',
      label: 'Cancelled',
      description: 'This booking has been revoked.',
    },
  }

  const config = statusConfig[status] || statusConfig.pending
  const Icon = config.icon

  return (
    <div className="flex flex-col gap-2">
      {/* Status Badge */}
      <div 
        className={`inline-flex items-center self-start gap-2.5 px-4 py-2 rounded-2xl border ${config.bg} ${config.border} transition-all duration-300 shadow-sm`}
      >
        {/* Animated Status Dot */}
        <div className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.dot} opacity-75`}></span>
          <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dot}`}></span>
        </div>

        <Icon className={`${config.color}`} size={16} />
        
        <span className={`text-[10px] font-black uppercase tracking-[0.15em] ${config.color}`}>
          {config.label}
        </span>
      </div>

      {/* Mini Description (Optional) */}
      <p className="text-[11px] font-medium text-slate-400 ml-1 italic">
        {config.description}
      </p>
    </div>
  )
}

export default BookingStatus