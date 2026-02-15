// src/components/auth/ForgotPassword.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FiMail, FiArrowLeft, FiSend, FiShield } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { authService } from '../../services/authService'
import toast from 'react-hot-toast'

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

const ForgotPassword = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data) => {
    try {
      await authService.forgotPassword(data.email)
      toast.success('Recovery link sent to your email!')
      navigate('/login')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] py-12 px-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[35%] h-[35%] bg-blue-50 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[35%] h-[35%] bg-slate-100 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-[440px] w-full">
        {/* Back Button */}
        <button
          onClick={() => navigate('/login')}
          className="group mb-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-all"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" size={14} />
          Back to Sign In
        </button>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 p-10 relative overflow-hidden">
          {/* Decorative Icon */}
          <div className="absolute -right-6 -top-6 text-slate-50 opacity-50">
            <FiShield size={120} />
          </div>

          <div className="relative z-10">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
              <FiMail className="text-blue-600" size={28} />
            </div>

            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Reset Password</h2>
            <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed">
              Enter the email associated with your account and we'll send a recovery link.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                  Recovery Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-blue-600 transition-colors">
                    <FiMail size={18} />
                  </div>
                  <input
                    type="email"
                    {...register('email')}
                    className={`w-full pl-12 pr-5 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-900 placeholder:text-slate-300 focus:ring-2 transition-all ${
                      errors.email ? 'ring-2 ring-rose-500' : 'focus:ring-blue-600'
                    }`}
                    placeholder="name@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-[10px] font-bold text-rose-500 ml-2 uppercase tracking-tighter">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] overflow-hidden transition-all hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    'Dispatching...'
                  ) : (
                    <>
                      Send Link <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* Support Link */}
        <p className="text-center mt-10 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
          Need help? <span className="text-blue-400 cursor-pointer hover:text-blue-600">Contact Support</span>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword