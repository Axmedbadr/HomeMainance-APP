import express from 'express';
import { 
    getMyBookings, 
    createBooking, 
    getAllBookings // Waxaan ku darnay tan si Admin-ku u arko ballamaha oo dhan
} from '../Controllers/controllerBooking.js';
import { protect, admin } from '../Middleware/auth.js'; 

const router = express.Router();

/**
 * 1. Abuurista Ballan Cusub
 * Jidka: POST /api/bookings/
 * Kani waa kan xallinaya 500 Error-ka
 */
router.post('/', protect, createBooking);

/**
 * 2. Helitaanka ballamaha qofka login-ka ah (sida Nimco)
 * Jidka: GET /api/bookings/my-bookings
 */
router.get('/my-bookings', protect, getMyBookings);

/**
 * 3. Maamulka Ballamaha (Admin View)
 * Jidka: GET /api/bookings/all
 * Kani waa kan soo saaraya xogta ID-ga (6992dd...) iyo qiimaha ($ 25)
 */
router.get('/all', protect, admin, getAllBookings);

export default router;