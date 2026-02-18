import Booking from '../models/Booking.js';

// 1. ADMIN ONLY: Aragtida dhammaan ballamaha
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

// 2. CUSTOMER ONLY: Macmiilku wuxuu arkaa kuwiisa kaliya
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

// 3. ABUURISTA BALLAN (Macmiilka)
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

// 4. ADMIN ONLY: Wax ka beddelka Status-ka (Approved/Rejected)
export const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; 
        
        const updatedBooking = await Booking.findByIdAndUpdate(
            id, 
            { status }, 
            { new: true }
        );
        
        if (!updatedBooking) {
            return res.status(404).json({ success: false, message: "Ballanta lama helin" });
        }

        res.status(200).json({ success: true, data: updatedBooking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 5. CUSTOMER ONLY: Soo dirista Transaction ID
export const updatePaymentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { transactionId } = req.body;

        if (!transactionId) {
            return res.status(400).json({ success: false, message: "Transaction ID waa muhiim" });
        }

        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            { transactionId },
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ success: false, message: "Ballanta lama helin" });
        }

        res.status(200).json({ 
            success: true, 
            message: "Xogta lacagta waa la helay", 
            data: updatedBooking 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 6. ADMIN ONLY: Xogta Dashboard-ka (Final Component)
// Shaqadan waxay isugu geyneysaa xogta "Total Requests", "Pending", "Completed" iyo Lacagta.
export const getAdminDashboardStats = async (req, res) => {
    try {
        // Isugeynta dhammaan ballamaha platform-ka
        const totalRequests = await Booking.countDocuments();

        // Ballamaha sugaya in lala tacaalo
        const pendingActions = await Booking.countDocuments({ status: 'pending' });

        // Ballamaha si guul leh u dhammaaday
        const completed = await Booking.countDocuments({ status: 'completed' });

        // Xisaabinta guud ahaan lacagta soo xarootay (Revenue)
        const revenueData = await Booking.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: null, total: { $sum: "$totalPrice" } } }
        ]);

        res.status(200).json({
            success: true,
            stats: {
                totalRequests,
                pendingActions,
                completed,
                totalSpent: revenueData[0]?.total || 0
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};