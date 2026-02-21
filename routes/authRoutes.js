import express from 'express';
const router = express.Router();
import { 
  register, 
  login, 
  getMe, 
  updateProfile, 
  forgotPassword, // Hubi inuu ku jiro controller-kaaga
  resetPassword 
} from '../Controllers/authController.js';
import { protect } from '../middleware/auth.js';

// 1. Shaqooyinka caadiga ah
router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

// 2. PASSWORD RECOVERY (Halkan ayaan ka saxnay 404-ka)
router.post('/forgot-password', forgotPassword); 
router.post('/reset-password/:token', resetPassword);

export default router;