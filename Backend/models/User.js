import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    phone: { type: String },
    // Ku dar 'isVerified' si Adminku u xakameeyo Provider-ka
    isVerified: { type: Boolean, default: false },
    role: { 
        type: String, 
        enum: ['customer', 'admin', 'provider'], 
        default: 'customer' 
    }
}, { timestamps: true });

// Password-ka qari (Hash) ka hor keydinta
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    // SAXID: Waxaa la isticmaalaa genSalt ee ma ahan getSalt
    const salt = await bcrypt.genSalt(10); 
    this.password = await bcrypt.hash(this.password, salt);
});

// Function-ka hubinta password-ka (Login)
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// XALKA MUHIIMKA AH: Ka hortagga "OverwriteModelError"
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;