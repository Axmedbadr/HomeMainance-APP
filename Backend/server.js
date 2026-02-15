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

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 2. Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(" MongoDB Connected!"))
    .catch((err) => console.error(" Database Error:", err));

// 3. ISKU XIRKA ROUTES (Halkan ayaa 404-ka laga xalliyay)
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);

// 4. Global Error Handler
app.use((err, req, res, next) => {
    console.error(" Server Error:", err.stack);
    res.status(500).json({ 
        success: false, 
        message: "Cillad farsamo ayaa dhacday!",
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});


process.on('uncaughtException', (err) => {
    console.error(' Uncaught Exception:', err);
});

const PORT = process.env.PORT || 5006;
app.listen(PORT, () => {
    console.log(` Server is running on http://localhost:${PORT}`);
});