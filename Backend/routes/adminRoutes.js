import express from 'express';
const router = express.Router();

// Soo jiid functions-ka controller-ka
// Hubi in getAdminStats lagu daray halkan
import { 
  getAdminStats, 
  getPendingProviders, 
  approveProvider, 
  rejectProvider 
} from '../Controllers/adminController.js';

// 1. Dashboard Stats (Kani waa kan muhiimka ah ee xallinaya 404 error)
// GET: /api/admin/stats
router.get('/stats', getAdminStats);

// 2. Hel dhammaan codsiyada sugaya (Pending)
// GET: /api/admin/pending-providers
router.get('/pending-providers', getPendingProviders);

// 3. Ansixi codsi gaar ah (Approve)
// PUT: /api/admin/approve-provider/:id
router.put('/approve-provider/:id', approveProvider);

// 4. Diid codsi gaar ah (Reject)
// PUT: /api/admin/reject-provider/:id
router.put('/reject-provider/:id', rejectProvider);

export default router;