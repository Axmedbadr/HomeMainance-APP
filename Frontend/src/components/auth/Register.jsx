import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import { FiBriefcase, FiTool } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
// MUHIIM: Soo dhoofso axios si xogta loogu diro Backend-ka
import axios from 'axios';

const registerSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Min 6 characters'),
  confirmPassword: z.string(),
  phone: z.string().min(10, 'Min 10 digits'),
  role: z.enum(['customer', 'provider']).default('customer'),
  serviceType: z.string().optional(),
  location: z.string().min(3, 'Location is required'),
  bio: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const Register = () => {
  const { register: submitUser } = useAuth(); 
  const navigate = useNavigate();
  
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'customer' }
  });

  const selectedRole = watch('role');
  const isProvider = selectedRole === 'provider';

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...userData } = data;
      
      // 1. Diiwaangeli Account-ka (User model)
      await submitUser(userData);

      // 2. Haddii uu yahay Professional, u dir xogta ururinta 'providers'
      if (isProvider) {
        const providerData = {
          fullName: data.name,
          email: data.email,
          phone: data.phone,
          serviceType: data.serviceType,
          location: data.location,
          bio: data.bio,
          status: 'pending' // Kani wuxuu hubinayaa in Admin-ku arko
        };

        // Hubi in Port-ka (5006) uu la mid yahay kan server.js-kaaga
        await axios.post('http://localhost:5006/api/providers/apply', providerData);

        alert("Codsigaaga waa la diray! Adminka ayaa dib kaaga soo jawaabi doona email.");
        navigate('/pending-approval'); 
      } else {
        alert("Diiwaangelintaadu way guulaysatay!");
        navigate('/services'); 
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert("Khalad ayaa dhacay: " + (error.response?.data?.message || "Server-ka lama heli karo"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] py-16 px-6">
      <div className="max-w-[550px] w-full bg-white rounded-[3rem] shadow-2xl p-10 md:p-12">
        <h1 className="text-3xl font-black text-center mb-8">
          {isProvider ? 'Partner Join' : 'Create Account'}
        </h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="relative">
            <FiBriefcase className="absolute left-4 top-4 text-slate-400" />
            <select {...register('role')} className="w-full pl-12 py-4 bg-slate-50 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
              <option value="customer">Customer (Looking for services)</option>
              <option value="provider">Professional (Offering services)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <input {...register('name')} placeholder="Full Name" className="w-full px-5 py-4 bg-slate-50 rounded-2xl font-bold border-none" />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <input {...register('phone')} placeholder="Phone (e.g. 063...)" className="w-full px-5 py-4 bg-slate-50 rounded-2xl font-bold border-none" />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
          </div>

          <input {...register('email')} type="email" placeholder="Email Address" className="w-full px-5 py-4 bg-slate-50 rounded-2xl font-bold border-none" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}

          <input {...register('location')} placeholder="Your City/Location" className="w-full px-5 py-4 bg-slate-50 rounded-2xl font-bold border-none" />
          {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}

          {isProvider && (
            <div className="p-5 bg-blue-50 rounded-2xl space-y-3 border border-blue-100">
              <label className="text-[10px] font-bold uppercase text-blue-600 tracking-widest flex items-center">
                <FiTool className="mr-1" /> Professional Details
              </label>
              <select {...register('serviceType')} className="w-full p-3 bg-white rounded-xl font-bold outline-none border-none">
                <option value="">Select Specialty</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Carpentry">Carpentry</option>
              </select>
              <textarea {...register('bio')} placeholder="Briefly describe your experience..." className="w-full p-3 bg-white rounded-xl font-bold h-20 border-none outline-none" />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <input {...register('password')} type="password" placeholder="Password" className="w-full px-5 py-4 bg-slate-50 rounded-2xl font-bold border-none" />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <input {...register('confirmPassword')} type="password" placeholder="Confirm" className="w-full px-5 py-4 bg-slate-50 rounded-2xl font-bold border-none" />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg active:scale-95">
            {isSubmitting ? 'Processing...' : 'Register Now'}
          </button>
          
          <p className="text-center text-slate-500 font-bold text-sm">
            Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;