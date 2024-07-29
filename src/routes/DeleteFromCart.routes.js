import express from 'express'
import authMiddleware from '../middlewares/checkauth.js';
import { Cart } from '../models/Cart.models.js';

const router = express.Router();

router.delete('/removeProduct', authMiddleware, async (req, res) => {
    try {
        const userId = req.userid;
        const { productId } = req.body; // Expecting the product ID in the request body

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'No cart found for this user' });
        }

        cart.products = cart.products.filter(product => product.cloth.toString() !== productId);
        cart.Totalprice = cart.products.reduce((total, product) => 
            total + (product.clothprice * product.quantity), 0);

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.log("err at removeProduct: " + error);
        res.status(500).json({ message: 'Server error' });
    }
});


export default router;