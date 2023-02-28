const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Role = require('../models/role');
// const config = require('config');


async function hashedPassword(password) {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};


// @desc   Register a new user
// @route  POST /api/register
// @access Public
// router.post('/', async (req, res) => {
async function RegisterUser (req, res) {
    // Check if the user already exists
    User.findOne({ student_id: req.body.student_id }, async (err, user) => {
        if (err) {
            return next(err);
        }
        if (user) {
            return res.status(400).send('User already exists');
        }
    });

    // Generate a password
    const password = generatePassword();
    const newpass = await hashedPassword(password);
    // const token = jwt.sign({ UserId: user._id }, process.env.TOKEN_SECRET);
    
    // Create a new user
    const user = new User({
        student_id: req.body.student_id,
        password: newpass,
        student_id_email: req.body.student_id_email,
        isActive: true // Only applies to new members
    });

    // Set the new method to generate the token
    // const token = user.generateAuthToken();
    
    // Find the role
    const role = await Role.findOne({ name: 'Student' });
    if (!role) return res.status(400).send('Role not found');
    // Assign the role to the user
    user.role = role._id;

    // Generate an auth token
    


    // Save the user
    try {
        const savedUser = await user.save();
        // Generate an auth token for new user
        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send(token);
    } catch (err) {
        res.status(400).send('Cannot register user');
        console.log(err);
    }
};

// @desc   Generate Password for new user
// @route  POST /api/register/
// @access Public


// Export the router
module.exports = router;