import mongoose from 'mongoose';

// 1. PROVIDER SCHEMA (Kan ayaa kuu dhimanaa)
const providerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  serviceType: { type: String, required: true }, // Tusaale: Nijaar, Barbeero
  location: { type: String, required: true },
  bio: { type: String },
  pricePerHour: { type: Number },
  rating: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true },
  image: { type: String }
}, { timestamps: true });

export const Provider = mongoose.models.Provider || mongoose.model('Provider', providerSchema);

// 2. BOOKING SCHEMA
const bookingSchema = new mongoose.Schema({
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' }, // Isku xirka Service-ka
  date: { type: String, required: true },
  time: { type: String, required: true },
  address: { type: String, required: true },
  totalPrice: { type: Number, default: 0 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
}, { timestamps: true });

export const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

// 3. REVIEW SCHEMA
const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true }
}, { timestamps: true });

export const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);