// src/components/reviews/ReviewForm.jsx
import React from 'react'
import reviewService from '../../services/reviewService'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FiStar, FiSend, FiMessageSquare, FiActivity } from 'react-icons/fi'

const reviewSchema = z.object({
  rating: z.number().min(1, 'Please select a rating').max(5),
  comment: z.string().min(10, 'Review must be at least 10 characters long'),
})

const ReviewForm = ({ serviceId, providerId, onReviewAdded }) => {
  const [selectedRating, setSelectedRating] = React.useState(0)
  const [hoverRating, setHoverRating] = React.useState(0)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: '',
    },
  })

  const handleRatingClick = (star) => {
    setSelectedRating(star)
    setValue('rating', star, { shouldValidate: true })
  }

  const onSubmit = async (data) => {
    try {
      await reviewService.create({
        service: serviceId,
        serviceProvider: providerId,
        rating: data.rating,
        comment: data.comment,
      })
      reset()
      setSelectedRating(0)
      if (onReviewAdded) onReviewAdded()
      // Waxaan ku bedelay Alert-ga UI jilicsan haddii aad rabto, laakiin logic-gii waa sidii
    } catch (error) {
      console.error('Error creating review:', error)
    }
  }

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden transition-all duration-500 hover:shadow-blue-900/5">
      
      {/* Header Section */}
      <div className="bg-slate-900 p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-black tracking-tight mb-1 text-white">Share Your Experience</h2>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">Feedback drives excellence</p>
        </div>
        <FiMessageSquare className="absolute -right-4 -bottom-4 text-white/5 w-24 h-24 rotate-12" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
        {/* Star Selection Area */}
        <div className="flex flex-col items-center justify-center py-4 space-y-4 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Overall Satisfaction
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleRatingClick(star)}
                className="group relative p-1 transition-all duration-300 active:scale-90"
              >
                <FiStar 
                  size={36} 
                  className={`transition-all duration-300 ${
                    (hoverRating || selectedRating) >= star 
                      ? 'text-yellow-400 scale-110' 
                      : 'text-slate-200'
                  }`} 
                  fill={(hoverRating || selectedRating) >= star ? "currentColor" : "none"} 
                />
                {(hoverRating || selectedRating) >= star && (
                  <span className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full scale-150 -z-10"></span>
                )}
              </button>
            ))}
          </div>
          {errors.rating && (
            <p className="text-[10px] font-bold text-rose-500 uppercase tracking-tighter">{errors.rating.message}</p>
          )}
        </div>

        {/* Comment Field */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
            <FiMessageSquare className="text-blue-500" />
            Detailed Review
          </label>
          <textarea
            {...register('comment')}
            rows={4}
            className={`w-full px-6 py-5 bg-slate-50 border-none rounded-[1.5rem] font-bold text-slate-900 focus:ring-2 transition-all resize-none placeholder:text-slate-300 ${errors.comment ? 'ring-2 ring-rose-500' : 'focus:ring-blue-600'}`}
            placeholder="Tell us what you liked or how we can improve..."
          />
          {errors.comment && (
            <p className="text-[10px] font-bold text-rose-500 ml-2 uppercase tracking-tighter">{errors.comment.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || selectedRating === 0}
          className="group relative w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] overflow-hidden transition-all hover:bg-slate-900 hover:shadow-xl hover:shadow-blue-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            {isSubmitting ? (
              <>
                <FiActivity className="animate-spin" />
                Submitting Feedback...
              </>
            ) : (
              <>
                Submit Review <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </button>
      </form>
    </div>
  )
}

export default ReviewForm