const bcrypt = require('bcrypt');
const auth  = require('../middleware/auth');
const config = require('config');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const {User,validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res)=>{
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/',async (req, res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('User already registered!');

    user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        phoneNumber: req.body.phoneNumber,
        accountType: req.body.accountType,
        role: req.body.role
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();
    
    res.setHeader('x-auth-token', token);
    res.send(_.pick(user, ['fullName','email']));
});



module.exports = router; 