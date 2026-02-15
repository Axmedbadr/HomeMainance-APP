import express from 'express';
import { 
    getProviders, 
    getProviderById, 
    registerProvider, 
    updateProvider, 
    updateStatus 
} from '../Controllers/providers.js'; // Hubi in magaca faylku sax yahay

const router = express.Router();

// KAN AYAA MUHIIM AH: Marka hore Register dhig
router.post('/register', registerProvider); 

router.get('/', getProviders);
router.get('/:id', getProviderById);
router.put('/:id', updateProvider);
router.put('/:id/status', updateStatus);

export default router;