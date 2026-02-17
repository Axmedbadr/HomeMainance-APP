import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

// 1. Soo dhoofinta Routes-ka
import userRoutes from './routes/userRoutes.js';
import serviceRoutes from './routes/services.js';
import providerRoutes from './routes/providers.js';
import bookingRoutes from './routes/routeBooking.js'; 
import reviewRoutes from './routes/reviews.js'; 
import adminRoutes from './routes/adminRoutes.js'; 

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 2. Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected!"))
    .catch((err) => console.error("❌ Database Error:", err));

// 3. ISKU XIRKA ROUTES
// Hubi in kuwani ay u qoran yihiin sida saxda ah si looga fogaado 404 Error
app.use('/api/users', userRoutes);      // Kani waa kan maareeya /register
app.use('/api/services', serviceRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);     // Kan ayaa xalliyay 404 error-kii Dashboard-ka

// 4. Global Error Handler
app.use((err, req, res, next) => {
    console.error("🔥 Server Error:", err.stack);
    res.status(500).json({ 
        success: false, 
        message: "Cillad farsamo ayaa dhacday!",
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// Ka hortagga in server-ku u dhaco cillad aan la fileyn
process.on('uncaughtException', (err) => {
    console.error('💥 Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
    console.error('💥 Unhandled Rejection:', err);
});

const PORT = process.env.PORT || 5006;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});