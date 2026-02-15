import { Booking } from '../models/models.js';

// 1. Abuurista ballan cusub
export const createBooking = async (req, res) => {
    try {
        const { serviceId, date, time, address, totalPrice } = req.body;
        const newBooking = await Booking.create({
            service: serviceId,
            date,
            time,
            address,
            totalPrice,
            userId: req.user ? req.user.id : null
        });
        res.status(201).json({ success: true, data: newBooking });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// 2. HELITAANKA BALLAMAHA (Kani waa kan dhibka keenay)
// Hubi inuu magacu sax yahay: getMyBookings
export const getMyBookings = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : null;
        const bookings = await Booking.find({ userId }).populate('service');
        res.json({ success: true, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 3. Cusboonaysiinta
export const updateBookingStatus = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, data: booking });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};