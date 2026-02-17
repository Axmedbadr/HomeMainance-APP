import express from 'express';
import jwt from 'jsonwebtoken';
import { User, Provider } from '../models/models.js';
import { protect } from '../Middleware/auth.js';

const router = express.Router();

// 1. DIIWAANGELINTA (Kani waa kan xallinaya 404 Error)
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;
        const userExists = await User.findOne({ email });
        
        if (userExists) return res.status(400).json({ success: false, message: "Email-kan hore ayaa loo isticmaalay" });

        const user = await User.create({ 
            name, email, password, phone, 
            role: role || 'customer' 
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.status(201).json({ success: true, token, user: { id: user._id, name: user.name, role: user.role } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 2. PROVIDER APPLY (Codsiga Nasir/Nimco)
router.post('/providers/apply', async (req, res) => {
    try {
        const { fullName, email, phone, serviceType, location, bio } = req.body;
        const alreadyApplied = await Provider.findOne({ email });
        if (alreadyApplied) return res.status(400).json({ message: "Codsi hore ayaa laga hayaa email-kan" });

        await Provider.create({ fullName, email, phone, serviceType, location, bio, status: 'pending' });
        res.status(201).json({ success: true, message: "Codsigaaga waa la helay!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 3. LOGIN
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ success: false, message: "Email ama Password khaldan" });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.json({ success: true, token, user: { id: user._id, name: user.name, role: user.role } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;