import jwt from 'jsonwebtoken';
import { User, Provider } from '../models/User.js';

// 1. Diiwaangelinta (Register)
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, role, serviceType, location } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'Email-kan hore ayaa loo diiwaangeliyey' });
    }

    const user = await User.create({
      name,
      email,
      password, // Hubi in Model-kaaga uu leeyahay password hashing (bcrypt)
      phone,
      role: role || 'customer'
    });

    if (user) {
      if (role === 'provider') {
        await Provider.create({
          user: user._id,
          fullName: name,
          serviceType: serviceType,
          location: location || 'Lama cayimin',
          status: 'pending' 
        });
      }

      // Hubi in JWT_SECRET uu ku jiro .env, haddii kale isticmaal "fallback_secret"
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "fallback_secret_123", { expiresIn: '30d' });

      res.status(201).json({
        success: true,
        token, // Frontend-ka wuxuu u baahan yahay kan si uusan u soo boodin
        user: { _id: user._id, name: user.name, email: user.email, role: user.role }
      });
    }
  } catch (error) {
    console.error('🔥 Register Error:', error.message);
    res.status(500).json({ success: false, message: 'Cillad farsamo: ' + error.message });
  }
};

// 2. Soo gelidda (Login) - KAN AYAA MUHIIM U AH DASHBOARD-KA
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Ka raadi user-ka email-kiisa
    const user = await User.findOne({ email });

    // MUHIIM: Halkan waa in lagu hubiyaa password-ka (Tusaale ahaan bcrypt.compare)
    // Haddii aad isticmaasho plain text (oo aan lagula talin), waa: user.password === password
    if (user && (await user.matchPassword(password))) { 
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "fallback_secret_123", { expiresIn: '30d' });

      res.json({
        success: true,
        token, // Haddii kan la waayo, Frontend-ka wuxuu kugu celinayaa Login
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } else {
      res.status(401).json({ success: false, message: 'Email ama Password khaldan' });
    }
  } catch (error) {
    console.error('🔥 Login Error:', error.message);
    res.status(500).json({ success: false, message: 'Server-ka ayaa cillad la kulmay' });
  }
};

// 3. Helitaanka User-ka (Get Me)
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User-ka lama helin' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};