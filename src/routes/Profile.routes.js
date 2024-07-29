import express from 'express';
import authMiddleware from '../middlewares/checkauth.js';
import { User } from '../models/user.models.js';

const router = express.Router();

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.email }); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user information:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
