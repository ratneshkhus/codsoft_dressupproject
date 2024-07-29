import express from 'express'
import { Cloth } from '../models/product.models.js';

const router = express.Router();

router.get('/details/:id', async (req, res) => {
    try {
        console.log("Received request for product details with ID:", req.params.id);
        const product = await Cloth.findById(req.params.id);
        
        if (!product) {
            console.log("Product not found");
            return res.status(404).json({ message: 'Product not found' });
        }
        
        console.log("Product found:", product);
        res.status(200).json(product);
        
    } catch (err) {
        console.error("Error fetching product details:", err);
        res.status(500).json({ message: err.message });
    }
});

export default router;