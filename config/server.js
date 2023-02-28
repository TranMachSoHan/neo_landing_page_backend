const express = require('express');
const bodyParser = require('body-parser')

const server = express();

const cors = require( 'cors' ),
    // Allow Origins according to your need.
    corsOptions = {
        'origin': '*'
    };

server.use( cors( corsOptions ) );

server.use(bodyParser.json());

module.exports = server;
