// src/components/reviews/RatingStars.jsx
import React from 'react'
import { FiStar } from 'react-icons/fi'

const RatingStars = ({ rating, size = 20, interactive = false, onRatingChange }) => {
  const stars = [1, 2, 3, 4, 5]

  if (interactive) {
    return (
      <div className="flex space-x-1">
        {stars.map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className={`p-1 rounded-full transition-colors ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'
            }`}
            aria-label={`Rate ${star} stars`}
          >
            <FiStar size={size} />
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-1">
      {stars.map((star) => (
        <FiStar
          key={star}
          className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}
          size={size}
        />
      ))}
      <span className="ml-2 text-sm font-medium text-gray-700">
        {rating.toFixed(1)} / 5
      </span>
    </div>
  )
}

export default RatingStars