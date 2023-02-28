const express = require('express'), router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Role = require('../models/role');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/admin');
const UserController = require('../controllers/UserController');
const CheckRegisterUser = require('../middleware/auth');

// @desc get current user
// @route GET /api/users
// @access Private
router.get('/me', [auth, isAdmin] , async (req, res) => {
    const user = await User.findOne(req.user._id).select('-password');
    if (!user) return res.status(404).send('User not found');
    
    res.send(user);
});

router.get('/', UserController.updateMemberShip);
router.get('/all', UserController.getAll);
router.post('/post', UserController.insert);
router.post('/test', UserController.MemberRegistration);
router.post('/login', UserController.UserAuthenticate);
module.exports = router;