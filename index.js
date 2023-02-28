const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// route and folder component
const register = require('./src/routes/register');
const role = require('./src/routes/role');
// const config = require('config');
const req = require('./src/routes/req');


require('dotenv').config();
const server = require('./config/server')
require('./config/database')

// if (!config.get('jwtPrivateKey')) {
//     console.error('FATAL ERROR: Token is not defined.');
//     process.exit(1);
// }

const router = express.Router()

module.exports = router;

//Post Method
router.post('/post', (req, res) => {
    res.send('Post API')
})

//Get all Method
router.get('/getAll', (req, res) => {
    res.send('Get All API')
})

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send('Get by ID API')
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send(req.params.id)
})

/**
 * PUT IN THE CONFIG FOLDER
 */
// Routes
server.use('/api/register', register );
server.use('/api/role', role);
server.use('/api/users', require('./src/routes/users'));
server.use('/api/query', req);  // this is the route for the query


// Setup Port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));