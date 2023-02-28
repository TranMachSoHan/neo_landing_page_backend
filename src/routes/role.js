const express = require('express');
const router = express.Router();
const Role = require('../models/role');
const User = require('../models/user');
const auth = require('../middleware/auth');

// This should be protected by authentication
router.get('/',auth, (req, res) => {
    Role.find(function(err, roles) {
        if (err) {
            return next(err);
        }
        res.json(roles);
    });
});

// @desc   Get a role by its name
// @route  GET /api/role/:id
// @access Public
// This should be protected by authentication
router.get('/role/:id', async (req, res) => {
    const role = await Role.findOne({ name:req.params.role_name });
        if (err) {
            return next(err);
        }
        res.json(role);
});


// @desc    Create a role
// @route  POST /api/role/:id
// @access Public
// This should be protected by authentication
router.post('/', [auth], async (req, res) => {
    // Check if the role already exists
    let role = await Role.findOne({
        name: req.body.role_name
    });
    if (role) return res.status(400).send('Role already exists');

    // Create a new role
    role = new Role({
        name: req.body.role_name,
        privileges: req.body.privileges,
    });

    // Save the role
    try {
        const savedRole = await role.save();
        res.send(savedRole);
    }
    catch (err) {
        res.status(400).send('Cannot register role');
    }
});

// @desc   Update a role
// @route  PUT /api/role/:id
// @access Public
// This should be protected by authentication
router.put('/role/:id', async (req, res) => {
    // Find the role
    const role = await Role.findOne({ name: req.params.role_name });
    if (!role) return res.status(400).send('Role not found');

    // Update the role
    try {
        const updatedRole = await role.updateOne({
            $set: {
                name: req.body.role_name,
                privileges: req.body.privileges,
            }
        });
        res.send(updatedRole);
    }
    catch (err) {
        res.status(400).send('Cannot update role');
    }
});


// @desc   Delete a role
// @route  DELETE /api/role/:id
// @access Public
// This should be protected by authentication
router.delete('/role/:id', async (req, res) => {
    // Find the role
    const role = await Role.findOne({ name: req.params.role_name });
    if (!role) return res.status(400).send('Role not found');

    // Delete the role
    try {
        const deletedRole = await role.delete();
        res.send(deletedRole);
    }
    catch (err) {
        res.status(400).send('Cannot delete role');
    }
});

// Export the router
module.exports = router;