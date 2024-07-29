import express from 'express';
import { Cloth } from '../models/product.models.js'; 
const router = express.Router();

router.get('/browse/:category', async (req, res) => {
    const category = req.params.category;
    
    try {
        const products = await Cloth.find({ category: category });
        
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found in this category' });
        }
        console.log(products);
        res.status(200).json(products);
        
    } catch (err) {
        console.error("Error fetching products by category:", err);
        res.status(500).json({ message: err.message });
    }
});

export default router;
