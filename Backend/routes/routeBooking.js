import express from 'express';
import { 
    getMyBookings, 
    createBooking, 
    getAllBookings,
    updateBookingStatus,
    updatePaymentStatus // 1. Hubi inaan lagu soo daray Controller-ka
} from '../Controllers/controllerBooking.js';
import { protect, admin } from '../middleware/auth.js'; 

const router = express.Router();

// 1. Routes-ka Macmiilka (Customer)
router.post('/', protect, createBooking);
router.get('/my-bookings', protect, getMyBookings);

// 2. Route-ka Lacag Bixinta (Payment) - KAN AYAA KA MAQNAA
// Macmiilku waa inuu awoodaa inuu u soo diro Transaction ID
router.put('/payment/:id', protect, updatePaymentStatus);

// 3. Routes-ka Admin-ka
router.get('/all', protect, admin, getAllBookings); 
router.put('/status/:id', protect, admin, updateBookingStatus); 

export default router;