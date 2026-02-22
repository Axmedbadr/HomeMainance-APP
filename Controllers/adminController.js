import mongoose from 'mongoose';
import User from '../models/User.js';
import Booking from '../models/Booking.js';
import Service from '../models/Service.js'; // 1. Soo dhowee Service Model-ka

// ... (getAdminStats iyo getPendingProviders waa sidoodii)

// 3. Ansixinta Provider (Approve) - UPDATED WITH SERVICE MAPPING
export const approveProvider = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "ID-ga codsigu ma saxna" });
        }

        const providerData = await mongoose.connection.db.collection('providers').findOne({ 
            _id: new mongoose.Types.ObjectId(id) 
        });

        if (!providerData) {
            return res.status(404).json({ success: false, message: "Codsiga lama helin" });
        }

        // --- QAYBTA CUSUB: HELITAANKA SERVICE ID ---
        let finalServiceId = providerData.serviceId;

        // Haddii uusan haysan ID, magaca ku raadi DB-ga si uu u galo qaybtiisa saxda ah
        if (!finalServiceId && providerData.serviceType) {
            const foundService = await Service.findOne({ 
                name: { $regex: new RegExp(`^${providerData.serviceType}$`, 'i') } 
            });
            if (foundService) {
                finalServiceId = foundService._id;
            }
        }
        // ------------------------------------------

        // 2. MUHIIM: Update garee 'providers' collection-ka
        await mongoose.connection.db.collection('providers').updateOne(
            { _id: new mongoose.Types.ObjectId(id) },
            { 
                $set: { 
                    status: 'approved',
                    serviceId: finalServiceId // Halkan ayaan ku shubnay ID-ga qaybtiisa
                } 
            }
        );

        // 3. U samee ama u cusboonaysii Account-kiisa 'users'
        await User.findOneAndUpdate(
            { email: providerData.email },
            { 
                $set: {
                    name: providerData.fullName || providerData.name,
                    email: providerData.email,
                    phone: providerData.phone,
                    role: 'provider',
                    serviceType: providerData.serviceType, // Ku dar halkan si User-ku u ogaado shaqadiisa
                    status: 'approved',
                    isVerified: true
                },
                $setOnInsert: { password: "temporaryPassword123" } 
            },
            { upsert: true, new: true }
        );
        
        res.status(200).json({ 
            success: true, 
            message: `Xirfadlaha qaybta ${providerData.serviceType} si guul leh ayaa loo ansixiyey!` 
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ... (rejectProvider waa sidii uu ahaa)