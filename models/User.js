import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    phone: { type: String },
    location: { type: String, default: "" }, 
    bio: { type: String, default: "" },
    serviceType: { type: String, default: "Professional Specialist" },
    isVerified: { type: Boolean, default: false },
    role: { 
        type: String, 
        enum: ['customer', 'admin', 'provider'], 
        default: 'customer' 
    },
    // KHADADKAN AYAA KA MAQNAA OO PASSWORD RESET-KA KEENAYAY ERROR
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Password-ka qari (Hash)
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10); 
    this.password = await bcrypt.hash(this.password, salt);
});

// MAGACAN WAA INUU NOQDAA comparePassword SI UU CONTROLLER-KA ULA SHAQEEYO
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;