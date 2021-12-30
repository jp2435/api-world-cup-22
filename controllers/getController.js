const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

const Group = require('../models/group');
const Team = require('../models/team');
const Game = require('../models/game');

router.use(authMiddleware);


// Group Get Routes

router.get('/group/:idGroup', async(req,res) => {
    try{
        const group = await Group.findById(req.params.idGroup);
        const teams = await Team.find({group: group._id});

        return res.send({group, teams});
    }catch(err){
        return res.status(400).send({
            error: `Error getting group with id:${req.params.idGroup}`
        });
    };
});

router.get('/group', async(req,res) => {
    try{
        if(req.query.name == undefined){
            return res.status(400).send({
                error: 'Error no query declared'
            });
        };
        const group = await Group.findOne({name: req.query.name});

        return res.send({group});
    }catch(err){
        return res.status(400).send({
            error: 'Eror'
        })
    };
});

router.get('/groups', async(req,res) => {
    try{
        const groups = await Group.find();

        return res.send({groups});
    }catch(err){
        return res.status(400).send({
            error: 'Error gettings all groups'
        });
    };
});

module.exports = app => app.use('/get', router);