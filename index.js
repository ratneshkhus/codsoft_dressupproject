

import express, { response } from 'express'
import mongoose from 'mongoose'
import axios from 'axios'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import path from 'path';
import dotenv from 'dotenv'
import { Cashfree } from "cashfree-pg"
import { randomBytes, createHash } from 'crypto';

import { fileURLToPath } from 'url';
import { conn } from './src/db/connection.js'
import { User } from './src/models/user.models.js'
import { Cloth } from './src/models/product.models.js'
import { Cart } from './src/models/Cart.models.js'
import { Order } from './src/models/order.models.js'

import authMiddleware from './src/middlewares/checkauth.js'
import Product from './src/routes/Product.routes.js'
import DetailsProducts from './src/routes/Details.routes.js'
import Linkfilter from './src/routes/Linksfilter.routes.js'
import Profile from './src/routes/Profile.routes.js'
import Register from './src/routes/Register.routes.js'
import addcart from './src/routes/Cart.routes.js'
import orderdataTable from './src/routes/Orderdata.routes.js'
import deletecart from './src/routes/DeleteFromCart.routes.js'
import updateuser from './src/routes/UserUpdate.routes.js'
import casefree from './src/routes/Casefree.routes.js'
import search from './src/routes/search.routes.js'
import userhis from './src/routes/Userhis.routes.js'


dotenv.config();
const app = express()
app.use(express.json())
app.use(cors({
    origin :["https://dressup-one.vercel.app/"],
    methods : ["GET","POST","PUT","DELETE"],
    credentials : true
}))

conn();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/cart', authMiddleware, (req, res) => {
    console.log(req.email);
    res.json(req.email);
})

app.get('/fetchcolths', async (req, res) => {
    try {
        const products = await Cloth.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

app.get('/products', async (req, res) => {
    const { categories } = req.query;
    const categoryArray = categories ? categories.split(',') : [];

    try {
        const products = await Cloth.find({ categories: { $in: categoryArray } });
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



const secreatkey = "ratnesh1234567"

app.post('/login', async (req, res) => {

    const { email, password } = req.body;
    try {
        const user1 = await User.findOne({ email });
        console.log(req.body);
        // console.log("idk whats happening here ::  " + user1);
        if (!user1) {
            return res.status(401).json({ message: 'User not found' })
        }
        if (user1.password !== password) {
            return res.status(401).json({ message: 'Password is incorrect' })
        }
        else {
            const token = jwt.sign({ email, userid : user1._id }, secreatkey, { expiresIn: '1h' });
            return res.status(200).json({ login: "login", token: token })
        }
    } catch (err) {
        res.status(500).json({ err: err })
    }
    console.log({ password, email });
});
app.post('/createOrder', authMiddleware, async (req, res) => {
    const userId = req.userid;
    // console.log(userId);
    const cart = await Cart.find({userId: userId });
    // console.log(cart[0].products);
    try {
        // const neworrder = new Order({userid:userId,products:cart[0].products},orderstatus:'panding',totalamount:cart[0].Totalprice)
        Order.create({
            userid: userId,
            products: cart[0].products,
            orderstatus: 'Pending',
            totalamount: Number(cart[0].Totalprice + 150)
        });
        await Cart.findOneAndDelete({ userId });

        if (!cart) {
            res.status(404).json({ message: "Cart not found" });
        }
        else{
            res.status(200).json(Order);
        }
    } catch (err) {
        console.error("Error creating order:", err);
        res.status(500).json({ message: "Server error" });
    }
});

app.use(Product)
app.use(DetailsProducts)
app.use(Linkfilter)
app.use(Profile)
app.use(Register)
app.use(addcart)
app.use(orderdataTable)
app.use(deletecart)
app.use(updateuser)
app.use(casefree)
app.use(search)
app.use(userhis)

app.listen(process.env.PORT, () => {
    console.log("server is runing");
})
