import express from 'express'
import authMiddleware from '../middlewares/checkauth.js';
import axios from 'axios'
import { Cart } from '../models/Cart.models.js';
import { User } from '../models/user.models.js';
import { Cashfree } from 'cashfree-pg';
import { randomUUID } from 'crypto';

const router = express.Router();

router.post('/currentorder',authMiddleware, async(req, res) => {
    const usernm = req.username;
    const mobile = req.mobile;
    const email = req.email;
    const {totalamout} = req.body;
    // console.log( req.userid+ email + totalamout);
    const user1 = await User.findOne({_id:req.userid});    // console.log(totalamout);
    console.log(user1);
    try {
        const randomId = randomUUID();
        try {
            const cashfreeRequest = {
                appId: process.env.CLIENT_ID,
                secretKey: process.env.CLIENT_SECRET,
                link_id: randomId,
                link_amount: totalamout,
                link_currency: 'INR',
                link_purpose: 'Payment for PlayStation 11',
                customer_details: {
                    customer_phone: String(user1.mobile) ,
                    customer_email: user1.email,
                    customer_name: user1.username,
                },
                link_notify: {
                    send_sms: true,
                    send_email: true
                },
                link_meta: {
                    return_url: 'http://localhost:5173/profile',
                    payment_methods: '',
                }
            };
            const httpheader = {
                'accpet': 'application/json',
                'content-type': 'application/json',
                'x-api-version': '2022-09-01',
                'x-client-id':  process.env.CLIENT_ID,
                'x-client-secret': process.env.CLIENT_SECRET,
            }
            const response = await axios.post('https://sandbox.cashfree.com/pg/links', cashfreeRequest, { headers: httpheader });
            if (response.data && response.data.link_url) {

                res.json({ paymentLink: response.data.link_url });
            } else {
                res.status(500).json({ error: 'Payment link not found in Cashfree response' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Payment initiation failed' });
        }

    } catch (error) {
        console.error('Error transferring data:', error);
    }

});
export default router;
