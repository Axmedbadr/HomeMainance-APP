import mongoose from 'mongoose';
import User from '../models/User.js';
import Booking from '../models/Booking.js';

// 1. Dashboard Stats (Sidaada ayay u fiican tahay)
export const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'customer' });
        const totalBookings = await Booking.countDocuments();
        const activeProviders = await User.countDocuments({ role: 'provider' });
        const pendingCount = await mongoose.connection.db.collection('providers').countDocuments({ status: 'pending' });

        const revenueData = await Booking.aggregate([
            { $group: { _id: null, total: { $sum: "$totalPrice" } } }
        ]);

        res.status(200).json({
            success: true,
            totalUsers,
            totalBookings,
            totalRevenue: revenueData[0]?.total || 0,
            activeProviders,
            pendingProviders: pendingCount
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. Helitaanka Codsiyada Pending-ka ah
export const getPendingProviders = async (req, res) => {
    try {
        const providers = await mongoose.connection.db.collection('providers')
            .find({ status: 'pending' })
            .toArray();
        res.status(200).json({ success: true, data: providers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 3. Ansixinta Provider (Approve) - KAN AYAA LA SAXAY
export const approveProvider = async (req, res) => {
    try {
        const { id } = req.params;
        const providerData = await mongoose.connection.db.collection('providers').findOne({ _id: new mongoose.Types.ObjectId(id) });

        if (!providerData) {
            return res.status(404).json({ success: false, message: "Codsiga lama helin" });
        }

        // TALAABADA SAXDA AH: Hubi haddii uu email-ku horay u jiray (User ahaan)
        const existingUser = await User.findOne({ email: providerData.email });

        if (existingUser) {
            // Haddii uu jiro, uun u bedel doorkiisa 'provider'
            existingUser.role = 'provider';
            existingUser.isVerified = true;
            await existingUser.save();
        } else {
            // Haddii uusan jirin, markaas abuur mid cusub
            await User.create({
                name: providerData.fullName,
                email: providerData.email,
                password: "temporaryPassword123", 
                phone: providerData.phone,
                role: 'provider',
                isVerified: true
            });
        }

        // Ugu dambayn ka tirtir codsiga pending-ka ahaa
        await mongoose.connection.db.collection('providers').deleteOne({ _id: new mongoose.Types.ObjectId(id) });
        
        res.status(200).json({ success: true, message: "Xirfadlaha waa la ansixiyey si guul leh" });

    } catch (error) {
        // Halkan ayaa soo qabanaysa Duplicate Email Error
        res.status(500).json({ success: false, message: error.message });
    }
};

// 4. Diidmada Provider
export const rejectProvider = async (req, res) => {
    try {
        const { id } = req.params;
        await mongoose.connection.db.collection('providers').deleteOne({ _id: new mongoose.Types.ObjectId(id) });
        res.status(200).json({ success: true, message: "Codsigii waa la diiday waana la tirtiray" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};