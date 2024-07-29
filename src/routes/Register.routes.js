import express from 'express'
import { User } from '../models/user.models.js';

const router = express.Router();

router.post('/register', (req, res) => {
    const { username, password, email, address, mobile } = req.body;
    // console.log({username,password,email,address,mobile});
    User.create({ username: username, password: password, email: email, address: address, mobile: mobile })
        .then(user => res.json(user))
        .catch(err => res.json(err))
})

export default router;