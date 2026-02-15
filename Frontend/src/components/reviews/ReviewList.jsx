import React from 'react'
import { FiStar, FiUser, FiCalendar } from 'react-icons/fi'
import { format } from 'date-fns'

const ReviewList = ({ reviews }) => {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review._id}
          className="border-b border-gray-200 pb-4 last:border-b-0"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                <FiUser className="text-primary" size={20} />
              </div>
              <div>
                <p className="font-semibold text-dark">{review.user?.name || 'Anonymous'}</p>
                <p className="text-sm text-gray-600">
                  {format(new Date(review.createdAt), 'MMM dd, yyyy')}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                  size={18}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-700">{review.comment}</p>
        </div>
      ))}
    </div>
  )
}

export default ReviewList