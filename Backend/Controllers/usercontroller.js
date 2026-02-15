import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// SHAQADA DIIWAANGELINTA (Register User)
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    // 1. Hubi haddii qofkani hore u jiray
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email-kan hore ayaa loo diiwaangeliyey' });
    }

    // 2. Abuur isticmaale cusub
    const user = await User.create({
      name,
      email,
      password, 
      phone,
      role: role || 'user'
    });

    if (user) {
      // 3. Abuur Token (JWT)
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

      res.status(201).json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone
        }
      });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(400).json({ message: error.message });
  }
};