const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const SecretEnv = process.env.SECRET;
const AcessCodeEnv = process.env.ACESSCODE;
const User = require( '../models/user');

function generateToken(params = {}){
    return jwt.sign(params, SecretEnv, {
        expiresIn: 7257600
    });
};

router.post('/register', async(req,res) => {
    const { email, AcessCode } = req.body
    try{
        if(AcessCode!=AcessCodeEnv){
            return res.status(401).send({
                error: 'Unauthorized to register, contact an admin'
            });
        };
        if(await User.findOne({ email })){
            return res.status(400).send({
                error: 'User already exists'
            });
        };
        const user = await User.create(req.body);
        user.password = undefined; // To dont show the password

        return res.send({
            user,
            token: generateToken({id: user.id})
        });

    }catch(err){
        return res.status(400).send({
            error: 'Registration failed'
        });
    };
});

router.post('/authenticate', async(req,res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email}).select('+password');

    if(!user){
        return res.status(400).send({
            error: 'User not found'
        });
    };
    if(!await bcrypt.compare(password, user.password)){
        return res.status(400).send({
            error: 'Invalid password'
        });
    };
    user.password = undefined;

    res.send({
        user,
        token: generateToken({id:user.id})
    });
});

module.exports = app => app.use('/auth', router);