import express from 'express';
import { Cloth } from '../models/product.models.js';
const router = express.Router();

router.get('/search', async (req, res) => {
    const { query } = req.query;

    try {
        const searchResults = await Cloth.find({
            $or: [
                { clothname: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } },
                { clothcolor: { $regex: query, $options: 'i' } },
                { clothprice: { $regex: query, $options: 'i' } }
            ]
        });

        res.status(200).json(searchResults);
    } catch (error) {
        console.error('Error searching cloth items:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
