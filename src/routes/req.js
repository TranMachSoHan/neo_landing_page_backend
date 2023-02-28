// Playground for the query string
const express = require('express');
const router = express.Router();
const {
    User
} = require('../models/user');
const {
    validateUser
} = require('../services/user');
const isAdmin = require('../middleware/admin');
const auth = require('../middleware/auth');

// @desc query current user
// @route GET /api/:studentID
// @access Private
router.get('/', validateUser);

module.exports = router;