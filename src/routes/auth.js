const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const isAdmin = require('../../middleware/admin');
const role = require('../models/role');






// @desc Login a user
// @route POST /api/auth
// @access Public
router.post('/', async (req, res) => {
    // Check if the user exists
    const user = await User.findOne({ student_id: req.body.student_id });
    if (!user) return res.status(400).send('User not found');

    // Check if the password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid password');

    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

    // res.send('Logged in');
});
