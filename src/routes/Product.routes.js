import express from 'express';
import { Cloth } from '../models/product.models.js';

const router = express.Router();

router.post('/insertproducts', async (req, res) => {
    const {
        clothname,
        imgurl,
        clothprice,
        material,
        clothsize,
        clothcolor,
        clothsStock,
        category,
        description
    } = req.body;

    try {
        const newCloth = await Cloth.create({
            clothname,
            imgurl,
            clothprice,
            material,
            clothsize,
            clothcolor,
            clothsStock,
            category,
            description
        });
        console.log("Data received: ", {
            clothname,
            imgurl,
            clothprice,
            material,
            clothsize,
            clothcolor,
            clothsStock,
            category,
            description
        });

        res.status(201).json(newCloth);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/randomWomenClothes', async (req, res) => {
    try {
        const randomClothes = await Cloth.aggregate([
            { $match: { category: 'women' } },  // Match only clothes tagged with 'women'
            { $sample: { size: 8 } }  // Randomly select 6 documents
        ]);

        res.status(200).json(randomClothes);
    } catch (error) {
        console.error('Error fetching random women clothes:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
