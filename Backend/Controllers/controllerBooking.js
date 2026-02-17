import Booking from '../models/Booking.js';

// 1. Helitaanka Dhammaan Ballamaha (Admin View)
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('userId', 'name email phone') 
            .populate('service', 'fullName price') 
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. Helitaanka Ballamaha Macmiilka (Customer View)
export const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user._id })
            .populate('service', 'fullName serviceType')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 3. ABUURISTA BALLAN CUSUB (Kani waa kii error-ka keenay - Hubi inuu EXPORT yahay)
export const createBooking = async (req, res) => {
    try {
        const { service, date, time, address, description, totalPrice } = req.body;
        
        const newBooking = await Booking.create({
            service,
            userId: req.user._id, 
            date,
            time,
            address,
            description: description || "No description provided",
            totalPrice: totalPrice || 25,
            status: 'pending'
        });

        res.status(201).json({ success: true, data: newBooking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 4. Cusboonaysiinta Xaaladda (Status Update)
export const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedBooking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
        res.status(200).json({ success: true, data: updatedBooking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};