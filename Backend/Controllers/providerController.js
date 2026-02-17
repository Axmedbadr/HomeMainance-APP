import bcrypt from 'bcryptjs';
import Provider from '../models/ServiceProvider.js'; 

// 1. Dashboard Stats
export const getAdminStats = async (req, res) => {
  try {
    const activeProviders = await Provider.countDocuments({ status: 'approved' });
    const pendingProviders = await Provider.countDocuments({ status: 'pending' });
    
    res.status(200).json({
      success: true,
      data: {
        activeProviders, 
        pendingProviders, 
        totalUsers: 3, 
        totalBookings: 10,
        totalRevenue: 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Codsiga cusub (Diiwaangelinta)
export const applyToBeProvider = async (req, res) => {
  try {
    const { fullName, email, phone, serviceType, location, bio } = req.body;
    const newApplication = await Provider.create({
      fullName, email, phone, serviceType, location, bio,
      status: 'pending'
    });
    res.status(201).json({ success: true, message: 'Codsigaaga waa la diray!', data: newApplication });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Soo saar DHAMAAN bixiyeyaasha (Approved kuwa ah)
export const getProviders = async (req, res) => {
  try {
    // Waxaan soo saaraynaa kaliya kuwa la ansixiyey (Approved)
    const providers = await Provider.find({ status: 'approved' });
    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- KANI WAA SHAQADA KA MAQNAYD EE XALLINAYSA 404 ERROR-KA ---
// 4. Soo saar HAL bixiye oo keliya (Single Provider Profile)
export const getProviderById = async (req, res) => {
  try {
    const { id } = req.params;
    const provider = await Provider.findById(id);
    
    if (!provider) {
      return res.status(404).json({ success: false, message: "Bixiyahan lama helin!" });
    }
    
    res.status(200).json({ success: true, data: provider });
  } catch (error) {
    res.status(500).json({ success: false, message: "ID-ga aad dirtay ma lahan qaab sax ah: " + error.message });
  }
};

// 5. Ansixinta (Update Status)
export const updateProviderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; 
    const updated = await Provider.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};