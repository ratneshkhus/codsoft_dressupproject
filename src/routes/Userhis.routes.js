import express from 'express';
import { Order } from '../models/order.models.js';
import authMiddleware from '../middlewares/checkauth.js';

const router = express.Router();

router.get('/orderdatahistory', authMiddleware, async (req, res) => {
    try {
        const userId = req.userid; 
        const orderdata = await Order.find({ userid: userId })
            .populate('products.cloth');

        if (!orderdata || orderdata.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        res.status(200).json(orderdata);
    } catch (error) {
        console.log("err at orderdatahistory: " + error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;