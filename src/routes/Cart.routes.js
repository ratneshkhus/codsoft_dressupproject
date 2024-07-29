import express from 'express'
import { Cart } from '../models/Cart.models.js'
import { Order } from '../models/order.models.js';
import { User } from '../models/user.models.js'
import authMiddleware from '../middlewares/checkauth.js';
import axios from 'axios';

const router = express.Router();

router.post('/addcart', async (req, res) => {
    const { id, userId,clothprice,selectedSize } = req.body;
    console.log(selectedSize);

    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {

            let Totalprice = cart.Totalprice;
            cart.Totalprice = Totalprice + clothprice;            
            const productIndex = cart.products.findIndex(p => p.cloth.toString() === id);

            if (productIndex > -1) {
                cart.products[productIndex].quantity += 1;
            } else {
                cart.products.push({ cloth: id, quantity: 1,clothprice,selectedSize });
            }

            await cart.save();
        } else {
            let Totalprice = clothprice;
            cart = new Cart({
                userId,
                products: [{ cloth: id, quantity: 1,clothprice,selectedSize }],
                Totalprice 
            });


            await cart.save();
        }


        res.status(200).json(cart);
    } catch (err) {
        console.error("Error adding to cart:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// router.post('/createOrder', authMiddleware, async (req, res) => {

//     const userid  = req.userid;

//     try {
//         let cart = await Cart.findOne({ userid });

//         if (cart) {
//             const newOrder = new Order({
//                 userid: userid,
//                 products: cart.products,
//                 orderstatus: 'Pending',
//                 totalamount: cart.Totalprice + 150
//             });

//             await newOrder.save();

//             await Cart.findOneAndDelete({ userid });

//             res.status(200).json(newOrder);
//         } else {
//             res.status(404).json({ message: "Cart not found" });
//         }
//     } catch (err) {
//         console.error("Error creating order:", err);
//         res.status(500).json({ message: "Server error" });
//     }
// });


export default router;