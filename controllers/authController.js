const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const authConfig = require('../config/auth');

router.get('/', async(req,res) => {
    console.log('Route /auth its working');
});

module.exports = app => app.use('/auth', router);