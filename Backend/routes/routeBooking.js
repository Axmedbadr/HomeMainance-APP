import express from 'express';
import { 
    createBooking, 
    getMyBookings, 
    updateBookingStatus 
} from '../Controllers/controllerBooking.js'; 

import { protect } from '../middleware/auth.js';

const router = express.Router();

// 1. Abuurista Booking (Waa sax)
router.post('/', protect, createBooking);

// 2. HELITAANKA BALLAMAHA (Sax halkan si 404 u baxo)
// Waxaan ka dhignay '/my-bookings' si uu ula mid noqdo waxa bookingService raadinayo
router.get('/my-bookings', protect, getMyBookings);

// 3. Cusboonaysiinta (Waa sax)
router.patch('/:id', protect, updateBookingStatus);

export default router;