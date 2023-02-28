const jwt = require('jsonwebtoken');
// const config = require('config');
const { getAllStudentIDs } = require('./SheetAPI');
const User = require('../models/user');
// const Role = require('../models/role')

function auth (req, res, next) {
    // const token = req.header('x-auth-token');
    // if (!token) return res.status(401).send('Access denied. No token provided.');
    // try {
    //     const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    //     req.user = decoded;
    //     next();
    // }
    // catch (ex) {
    //     res.status(400).send('Invalid token.');
    // }
}

//@desc Fetch the isActive data from the role schema from a given student id
//@Route
//@access Public
async function getisActive (student_id) {
    const user = User.findOne({student_id: student_id})
        .populate('role')
    if (user) {
        return user.isActive;
    } else {
        return null;
    }
}

//Generate token
async function generateToken (id) {
    return await jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

module.exports = generateToken;