import express from 'express'
import { User } from '../models/user.models.js'

const router = express.Router();

const secreatkey = "ratnesh1234567"

router.post('/login', async (req, res) => {

    const { email, password } = req.body;
    try {
        const user1 = await User.findOne({ email });

        // console.log("idk whats happening here ::  " + user1);

        if (!user1) {
            return res.status(401).json({ message: 'User not found' })
        }

        if (user1.password !== password) {
            return res.status(401).json({ message: 'Password is incorrect' })
        }
        else {
            const token = jwt.sign({ email:email ,username:user1.username,modile:user1.mobile9 }, secreatkey, { expiresIn: '1d' });
            return res.status(200).json({ login: "login", token: token })
        }

    } catch (err) {

        res.status(500).json({ err: err })
    }
    console.log({ password, email });
});

export default router;