import mongoose from 'mongoose';
import User from '../models/User.js';
import Booking from '../models/Booking.js';

// 1. Dashboard Stats - Lagu daray sarraynta xogta (Aggregation)
export const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'customer' });
        const totalBookings = await Booking.countDocuments();
        const activeProviders = await User.countDocuments({ role: 'provider' });
        
        // 1a. Helitaanka tirada codsiyada ku jira collection-ka kale
        const pendingCount = await mongoose.connection.db.collection('providers').countDocuments({ status: 'pending' });

        // 1b. Revenue-ka dhabta ah: Waxaan xisaabinaynaa kaliya ballamaha 'completed' ama 'approved' ah
        const revenueData = await Booking.aggregate([
            { 
                $match: { 
                    status: { $in: ['approved', 'completed'] } 
                } 
            },
            { 
                $group: { 
                    _id: null, 
                    total: { $sum: "$totalPrice" } 
                } 
            }
        ]);

        res.status(200).json({
            success: true,
            stats: {
                totalUsers,        // MACAAMIISHA (Sawirkaaga 1aad)
                totalBookings,     // BOOKINGS (Sawirkaaga 2aad)
                totalRevenue: revenueData[0]?.total || 0, // REVENUE (Sawirkaaga 3aad)
                activeProviders,   // ACTIVE PROVIDERS (Sawirkaaga 4aad)
                pendingProviders: pendingCount
            }
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

// 3. Ansixinta Provider (Approve)
export const approveProvider = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Hubi haddii ID-gu uu yahay mid sax ah
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "ID-ga codsigu ma saxna" });
        }

        const providerData = await mongoose.connection.db.collection('providers').findOne({ _id: new mongoose.Types.ObjectId(id) });

        if (!providerData) {
            return res.status(404).json({ success: false, message: "Codsiga lama helin" });
        }

        // XALKA DUPLICATE: Cusboonaysiin ama Abuurid
        await User.findOneAndUpdate(
            { email: providerData.email },
            { 
                $set: {
                    name: providerData.fullName || providerData.name,
                    email: providerData.email,
                    phone: providerData.phone,
                    role: 'provider',
                    isVerified: true
                },
                $setOnInsert: { password: "temporaryPassword123" } 
            },
            { upsert: true, new: true }
        );

        // Ka tirtir codsiga maadaama la ansixiyey
        await mongoose.connection.db.collection('providers').deleteOne({ _id: new mongoose.Types.ObjectId(id) });
        
        res.status(200).json({ success: true, message: "Xirfadlaha waa la ansixiyey, hadda wuxuu ka mid yahay Providers-ka" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 4. Diidmada Provider
export const rejectProvider = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "ID-ga ma saxna" });
        }
        
        await mongoose.connection.db.collection('providers').deleteOne({ _id: new mongoose.Types.ObjectId(id) });
        res.status(200).json({ success: true, message: "Codsigii waa la diiday waana la tirtiray" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};