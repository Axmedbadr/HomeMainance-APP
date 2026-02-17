import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// 1. User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: { type: String, enum: ['customer', 'admin', 'provider'], default: 'customer' }
}, { timestamps: true });

// Password-ka qari ka hor intaanan la keydin
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// --- KANI WAA QAYBTII KA DHIMNAYD ---
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 2. Provider Schema
const providerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  serviceType: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
}, { timestamps: true });

// 3. Booking Schema
const bookingSchema = new mongoose.Schema({
  service: { type: String, required: true }, 
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' }, 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

// 4. Review Schema
const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true }
}, { timestamps: true });

// FINAL EXPORTS
export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Provider = mongoose.models.Provider || mongoose.model('Provider', providerSchema);
export const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
export const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);