import express from 'express';
import { User } from '../models/user.models.js';
import authMiddleware from '../middlewares/checkauth.js';

const router = express.Router();

router.put('/updateuser', authMiddleware, async (req, res) => {
    try {
        const userId = req.userid;  // Ensure this line matches the middleware
        const updatedData = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error updating user: " + error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
