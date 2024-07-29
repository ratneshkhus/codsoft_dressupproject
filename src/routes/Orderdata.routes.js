import express from 'express';
import { Cart } from '../models/Cart.models.js';
import authMiddleware from '../middlewares/checkauth.js';

const router = express.Router();

router.get('/orderdataTable', authMiddleware, async (req, res) => {
    try {
        const userId = req.userid; 
        const orderdata = await Cart.findOne({ userId })
            // .select('products Totalprice')
            .populate('products.cloth');

        if (!orderdata) {
            return res.status(404).json({ message: 'No cart found for this user' });
        }

        res.status(200).json(orderdata);
        // const { products, Totalprice } = orderdata;
        // res.status(200).json({ products, Totalprice });
    } catch (error) {
        console.log("err at orderdataTable: " + error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;