import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import serviceService from '../../services/serviceService';
import reviewService from '../../services/reviewService';
import bookingService from '../../services/bookingService';

import { FiArrowLeft, FiStar, FiCalendar, FiClock, FiMapPin, FiCheckCircle, FiActivity, FiShield } from 'react-icons/fi';
import ReviewList from '../reviews/ReviewList';
import ReviewForm from '../reviews/ReviewForm';
import { useForm } from 'react-hook-form';

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadServiceData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await serviceService.getById(id);
      setService(response.data || response); 

      if (reviewService && typeof reviewService.getByService === 'function') {
        const reviewsResponse = await reviewService.getByService(id);
        const reviewsData = reviewsResponse.data || reviewsResponse;
        setReviews(Array.isArray(reviewsData) ? reviewsData : []);
      }
    } catch (error) {
      console.error('Error loading service details:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      loadServiceData();
    }
  }, [id, loadServiceData]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm();

  const onSubmitBooking = async (data) => {
    try {
      const bookingData = {
        serviceId: id,
        date: data.date,
        time: data.time,
        address: data.address,
        totalPrice: service?.price || 0,
      };
      
      await bookingService.create(bookingData);
      alert(' Booking successfully created!');
      reset();
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'An error occurred during booking';
      alert(` ${errorMsg}`);
    }
  };

  // --- SKELETON LOADING ---
  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
        <FiActivity className="absolute inset-0 m-auto text-blue-600 animate-pulse" />
      </div>
      <p className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Fetching Details</p>
    </div>
  );

  if (!service) return (
    <div className="container py-24 text-center">
      <h2 className="text-2xl font-black text-slate-900">Service Not Found</h2>
      <button onClick={() => navigate('/services')} className="mt-4 text-blue-600 font-bold underline">Back to Services</button>
    </div>
  );

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, r) => sum + (Number(r.rating) || 0), 0) / reviews.length 
    : 0;

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      {/* Header / Hero Section */}
      <div className="bg-[#0a0f1d] pt-12 pb-32 px-6">
        <div className="container mx-auto max-w-7xl">
          <button onClick={() => navigate('/services')} className="mb-10 flex items-center gap-2 text-white/60 hover:text-white transition-all group">
            <div className="p-2 bg-white/5 border border-white/10 rounded-xl group-hover:bg-blue-600 group-hover:border-blue-500 transition-all">
               <FiArrowLeft size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Back to Library</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-24 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* LEFT: Details & Form */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Service Main Card */}
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <FiShield className="text-blue-600" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Premium Service</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight">
                    {service.fullName || service.name}
                  </h1>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-3xl text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Price Start At</p>
                  <p className="text-4xl font-black text-blue-600 leading-none">${service.price || '0.00'}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 mb-8 py-4 border-y border-slate-50">
                <div className="flex items-center gap-2 bg-amber-50 text-amber-600 px-4 py-1.5 rounded-full font-black text-sm">
                  <FiStar fill="currentColor" /> {averageRating.toFixed(1)} 
                  <span className="text-amber-400 font-medium ml-1">({reviews.length} Reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 font-bold text-sm italic">
                  <FiCheckCircle className="text-green-500" /> Verified Quality
                </div>
              </div>

              <div className="space-y-4">
                 <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">Service Description</h3>
                 <p className="text-slate-500 text-lg leading-relaxed font-medium">
                   {service.description || "No detailed description provided for this service yet."}
                 </p>
              </div>
            </div>

            {/* Booking Form Card */}
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-blue-600/5 rotate-12">
                <FiCalendar size={120} />
              </div>
              
              <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Schedule Your Booking</h2>
              <form onSubmit={handleSubmit(onSubmitBooking)} className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-slate-400">Execution Date</label>
                    <input type="date" {...register('date', { required: true })} className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-blue-600 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-slate-400">Preferred Time</label>
                    <input type="time" {...register('time', { required: true })} className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-blue-600 transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-slate-400">Service Address</label>
                   <div className="relative">
                      <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input type="text" {...register('address', { required: true })} placeholder="Street, Block, City" className="w-full p-4 pl-12 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-blue-600 transition-all" />
                   </div>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
                  {isSubmitting ? 'Processing Order...' : 'Confirm Booking Now'}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT: Reviews Sidebar */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Customer Feed</h2>
                <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                  {reviews.length} Feedbacks
                </span>
              </div>
              <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                <ReviewList reviews={reviews} />
              </div>
            </div>

            <div className="bg-[#0a0f1d] p-8 rounded-[2.5rem] text-white shadow-2xl shadow-slate-900/20">
              <div className="flex items-center gap-3 mb-6">
                <FiClock className="text-blue-500" />
                <h3 className="font-black text-sm uppercase tracking-widest">Post a Review</h3>
              </div>
              <ReviewForm serviceId={id} onReviewAdded={loadServiceData} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;