// src/components/bookings/BookingList.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { FiCalendar, FiClock, FiMapPin, FiDollarSign, FiCheckCircle, FiXCircle, FiTool } from 'react-icons/fi'

const BookingList = ({ bookings, onStatusChange }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusAction = (status, bookingId) => {
    if (status === 'pending') {
      return (
        <div className="flex space-x-2 mt-3">
          <button
            onClick={() => onStatusChange(bookingId, 'confirmed')}
            className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
          >
            Hubi
          </button>
          <button
            onClick={() => onStatusChange(bookingId, 'cancelled')}
            className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
          >
            Jooji
          </button>
        </div>
      )
    }
    return null
  }

  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <FiCalendar className="mx-auto text-6xl text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Bookings Lama Helin</h3>
        <p className="text-gray-500 mb-6">Ma jirto bookings. Samee booking hadda!</p>
        <Link
          to="/services"
          className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-secondary transition-colors"
        >
          Adeegyada Eeg
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4"
          style={{ borderColor: getStatusColor(booking.status).split(' ')[0].replace('bg-', '').replace('-100', '-500') }}
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
            <div className="flex-1">
              <div className="flex items-start mb-3">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <FiTool className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-dark">
                    {booking.service?.name || booking.service}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {booking.service?.description?.substring(0, 60)}...
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="flex items-center text-gray-700">
                  <FiCalendar className="mr-2 text-primary" size={18} />
                  <span>{booking.date}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <FiClock className="mr-2 text-primary" size={18} />
                  <span>{booking.time}</span>
                </div>
                <div className="flex items-start text-gray-700">
                  <FiMapPin className="mr-2 mt-1 text-primary" size={18} />
                  <span className="text-sm">{booking.address}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center">
                <FiDollarSign className="mr-2 text-primary" size={20} />
                <span className="text-xl font-bold text-primary">${booking.totalPrice}</span>
              </div>
            </div>

            <div className="mt-4 md:mt-0 md:ml-6 text-right flex-shrink-0">
              <span className={`inline-block px-4 py-2 rounded-full font-semibold text-sm ${getStatusColor(booking.status)}`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
              
              {booking.status === 'completed' && (
                <div className="mt-3 flex items-center justify-end text-green-600">
                  <FiCheckCircle className="mr-2" size={20} />
                  <span>La dhammaystiray</span>
                </div>
              )}
              
              {booking.status === 'cancelled' && (
                <div className="mt-3 flex items-center justify-end text-red-600">
                  <FiXCircle className="mr-2" size={20} />
                  <span>La joojiyay</span>
                </div>
              )}

              {getStatusAction(booking.status, booking._id)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BookingList