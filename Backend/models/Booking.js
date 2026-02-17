import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    // Aqoonsiga adeegga (sida Axmed Cali)
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    
    // --- SAXITAANKA UGU MUHIIMSAN ---
    // Bedel 'user' una bedel 'userId' si uu ula mid noqdo controller-kaaga
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    date: { type: String, required: true },
    time: { type: String, required: true },
    address: { type: String, required: true },
    
    description: { 
        type: String, 
        default: "Ma jirto sharaxaad la bixiyey." 
    },
    
    totalPrice: { type: Number, default: 25 }, 
    
    status: { 
        type: String, 
        enum: ['pending', 'confirmed', 'completed', 'cancelled'], 
        default: 'pending' 
    }
}, { timestamps: true });

// Hubi inuusan error ka dhicin haddii model-ku horay u jiray
const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking;