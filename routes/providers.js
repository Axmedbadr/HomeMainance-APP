import express from 'express';
import { 
    getProviders, 
    getAdminStats, 
    applyToBeProvider, 
    updateProviderStatus,
    getProviderById // HUBI: Inaan halkan ku soo darnay function-ka cusub
} from '../Controllers/providerController.js';

const router = express.Router();

// 1. Dashboard Stats
router.get('/admin/stats', getAdminStats); 

// 2. Helitaanka dhammaan Providers (Approved kuwa ah)
router.get('/', getProviders); 

// --- KANI WAA JIDKA XALLINAYA 404 ERROR-KA ---
// 3. Helitaanka hal bixiye oo gaar ah (Profile Page)
// Marka Nimco ay taabato "View Profile" kani ayaa la wacaa
router.get('/:id', getProviderById); 

// 4. Codsiga cusub (Apply Page)
router.post('/apply', applyToBeProvider); 

// 5. Ansixinta (Update Status)
router.patch('/:id/status', updateProviderStatus); 

export default router;