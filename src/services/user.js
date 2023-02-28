// this controller is for user related routes
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { getStudentID } = require('../middleware/SheetAPI');



// @desc get user based on id
// @route GET /api/users/:id
// @access Private
async function validateUser(req, res, next) {
    // Using the query string in the url, alternatively, we can use the request body
    const user = await User.findOne(req.query).select('-password');
    if (!user) return getStudentID();

    res.send(user);
    next();
}





module.exports.validateUser = validateUser;
