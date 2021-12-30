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
        const teams = await Team.find({group: group._id});

        return res.send({group, teams});
    }catch(err){
        return res.status(400).send({
            error: `Error getting group with name: ${req.query.name}`
        });
    };
});

router.get('/groups', async(req,res) => {
    try{
        const groups = await Group.find();

        return res.send({groups});
    }catch(err){
        return res.status(400).send({
            error: 'Error getting all groups'
        });
    };
});


// Team Get Routes

router.get('/team/:idTeam', async(req,res) => {
    try{
        const team = await Team.findById(req.params.idTeam).populate(['group', 'games']);

        return res.send({team});
    }catch(err){
        return res.send.status(400).send({
            error: `Error getting team with id:${req.params.idTeam}`
        });
    };
});

router.get('/team', async(req,res) => {
    try{
        if(req.query.name == undefined){
            return res.status(400).send({
                error: 'Error no query declared'
            });
        };
        const name = req.query.name.charAt(0).toUpperCase() + req.query.name.slice(1);
        const team = await Team.findOne({name: name}).populate(['group', 'games']);

        return res.send({team});
    }catch(err){
        return res.status(400).send({
            error: `Error getting team with name: ${req.query.name}`
        });
    };
});

router.get('/teams', async(req,res) => {
    try{
        if(!(req.query.group == undefined)){
            const group = await Group.findOne({name: req.query.group});
            const teams = await Team.find({group: group._id});
            
            return res.send({teams, group});
        };
        const teams = await Team.find().populate('group');

        return res.send({teams});
    }catch(err){
        return res.status(400).send({
            error: 'Error getting all teams'
        });
    };
});

module.exports = app => app.use('/get', router);