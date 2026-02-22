import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    phone: { type: String },
    location: { type: String, default: "" }, 
    bio: { type: String, default: "" },
    
    // Qaybta Provider-ka (Shaqaalaha)
    serviceType: { type: String, default: "Professional Specialist" },
    
    // FIELD-KAN WAA MUHIIM: Si loogu xiro Service-ka rasmiga ah
    serviceId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Service',
        default: null 
    },
    
    status: { 
        type: String, 
        enum: ['pending', 'approved', 'rejected'], 
        default: 'approved' // Waxaad u beddeli kartaa 'pending' haddii aad rabto inaad adigu approve gareeyo
    },
    
    isVerified: { type: Boolean, default: false },
    role: { 
        type: String, 
        enum: ['customer', 'admin', 'provider'], 
        default: 'customer' 
    },
    
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

// Waxaan u bixinnay matchPassword si uu ula jaanqaado Controller-kaaga (Login)
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Waxaan kaloo u deynay comparePassword haddii meel kale aad ku isticmaashay
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

// Si uusan error u bixin Controller-kaaga Provider-ka raadinaya
// Waxaan u sameyneynaa 'Alias' si uu User u noqdo Provider-ka
const Provider = User; 

export { User, Provider };
export default User;