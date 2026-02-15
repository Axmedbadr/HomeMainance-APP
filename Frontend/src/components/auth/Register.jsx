import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import { FiUser, FiMail, FiLock, FiPhone, FiArrowRight, FiBriefcase } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  role: z.enum(['user', 'provider']).default('user'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'user' }
  });

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...userData } = data;
      await registerUser(userData);
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] py-16 px-6 relative overflow-hidden">
      {/* Abstract Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-5%] right-[-5%] w-[30%] h-[30%] bg-blue-100/40 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-indigo-100/40 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-[550px] w-full">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Create Account</h1>
          <p className="text-slate-500 font-medium tracking-tight">Join our premium network of home service professionals</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/60 border border-slate-100 p-10 md:p-12 backdrop-blur-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Full Name</label>
                <div className="relative group">
                  <FiUser className="absolute left-5 top-4 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                  <input 
                    {...register('name')} 
                    type="text"
                    placeholder="John Doe" 
                    className={`w-full pl-12 pr-5 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-900 placeholder:text-slate-300 focus:ring-2 transition-all ${errors.name ? 'ring-2 ring-rose-500' : 'focus:ring-blue-600'}`} 
                  />
                </div>
                {errors.name && <p className="text-[10px] font-bold text-rose-500 ml-2 uppercase">{errors.name.message}</p>}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Phone Number</label>
                <div className="relative group">
                  <FiPhone className="absolute left-5 top-4 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                  <input 
                    {...register('phone')} 
                    type="text"
                    placeholder="+252..." 
                    className={`w-full pl-12 pr-5 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-900 placeholder:text-slate-300 focus:ring-2 transition-all ${errors.phone ? 'ring-2 ring-rose-500' : 'focus:ring-blue-600'}`} 
                  />
                </div>
                {errors.phone && <p className="text-[10px] font-bold text-rose-500 ml-2 uppercase">{errors.phone.message}</p>}
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Email Address</label>
              <div className="relative group">
                <FiMail className="absolute left-5 top-4 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input 
                  {...register('email')} 
                  type="email"
                  placeholder="name@example.com" 
                  className={`w-full pl-12 pr-5 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-900 placeholder:text-slate-300 focus:ring-2 transition-all ${errors.email ? 'ring-2 ring-rose-500' : 'focus:ring-blue-600'}`} 
                />
              </div>
              {errors.email && <p className="text-[10px] font-bold text-rose-500 ml-2 uppercase">{errors.email.message}</p>}
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Account Type</label>
              <div className="relative group">
                <FiBriefcase className="absolute left-5 top-4 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                <select 
                  {...register('role')} 
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-900 appearance-none focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer transition-all"
                >
                  <option value="user">Customer (Looking for services)</option>
                  <option value="provider">Professional (Offering services)</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Password</label>
                <div className="relative group">
                  <FiLock className="absolute left-5 top-4 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                  <input 
                    {...register('password')} 
                    type="password" 
                    placeholder="••••••••" 
                    className={`w-full pl-12 pr-5 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-900 placeholder:text-slate-300 focus:ring-2 transition-all ${errors.password ? 'ring-2 ring-rose-500' : 'focus:ring-blue-600'}`} 
                  />
                </div>
                {errors.password && <p className="text-[10px] font-bold text-rose-500 ml-2 uppercase">{errors.password.message}</p>}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Confirm Password</label>
                <div className="relative group">
                  <FiLock className="absolute left-5 top-4 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                  <input 
                    {...register('confirmPassword')} 
                    type="password" 
                    placeholder="••••••••" 
                    className={`w-full pl-12 pr-5 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-900 placeholder:text-slate-300 focus:ring-2 transition-all ${errors.confirmPassword ? 'ring-2 ring-rose-500' : 'focus:ring-blue-600'}`} 
                  />
                </div>
                {errors.confirmPassword && <p className="text-[10px] font-bold text-rose-500 ml-2 uppercase">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="group relative w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] overflow-hidden transition-all hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-200 active:scale-[0.98] disabled:opacity-50 mt-4"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isSubmitting ? 'Processing...' : (
                  <>Get Started <FiArrowRight className="group-hover:translate-x-1 transition-transform" /></>
                )}
              </span>
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-10 text-center">
            <p className="text-slate-400 text-xs font-bold">
              Already have an account? {' '}
              <Link to="/login" className="text-blue-600 hover:text-slate-900 transition-colors underline underline-offset-4 decoration-2">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;