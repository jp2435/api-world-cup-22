const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const authConfig = require('../config/auth');

const Group = require('../models/group');
const Team = require('../models/team');
const Game = require('../models/game');

router.use(authMiddleware);


// Group Data

router.post('/group', async(req,res) => {
    try{
        const { AcessCodeDev } = req.body;
        if(!(AcessCodeDev==authConfig.AcessCodeDev)){
            return res.status(401).send({error: 'Unauthorized to create group'});
        };
        const group = await Group.create(req.body);
        return res.send({ group });
    }catch(err){
        return res.status(400).send({
            error: 'Error creating group'
        });
    };
});

router.put('/group/:idGroup', async(req,res) => {
    try{
        const { AcessCodeDev } = req.body;
        if(!(AcessCodeDev==authConfig.AcessCodeDev)){
            return res.status(401).send({error: 'Unauthorized to edit group'});
        };
        const group = await Group.findByIdAndUpdate(req.params.idGroup, req.body, {new: true});
        return res.send({group});
    }catch(err){
        console.log(err)
        return res.status(400).send({
            error: 'Error editing group'
        });
    };
});

router.delete('/group/:idGroup', async(req,res) => {
    try{
        const { AcessCodeDev } = req.body;
        if(!(AcessCodeDev==authConfig.AcessCodeDev)){
            return res.status(401).send({error: 'Unauthorized to delete group'});
        };
        
        await Group.findByIdAndDelete(req.params.idGroup);

        return res.send({ok: true})
    }catch(err){
        return res.status(400).send({
            error: 'Error deleting group'
        })
    }
});


// Team Data

router.post('/team', async(req,res) => {
    try{
        const { name, group, AcessCodeDev } = req.body;
        if(!(AcessCodeDev==authConfig.AcessCodeDev)){
            return res.status(401).send({error: 'Unauthorized to create team'});
        };
        if(await Team.findOne({name})){
            return res.status(400).send({error : 'Team already exist'});
        };
        const groupName = await Group.findOne({name: group});
        const team = await Team.create({...req.body, group: groupName._id});

        return res.send({team});
    }catch(err){
        return res.status(400).send({
            error: 'Error creating team'
        });
    };
});

router.put('/team/:idTeam', async(req,res) => {
    try{
        const { AcessCodeDev } = req.body;
        if(!(AcessCodeDev==authConfig.AcessCodeDev)){
            return res.status(401).send({error: 'Unauthorized to edit team'});
        };
        const team = await Team.findByIdAndUpdate(req.params.idTeam, {...req.body}, {new: true}).populate('group');
        
        return res.send({team});
    }catch(err){
        return res.status(400).send({
            error: 'Error editing team'
        });
    };
});

router.delete('/team/:idTeam', async(req,res) => {
    try{
        const { AcessCodeDev } = req.body;
        if(!(AcessCodeDev==authConfig.AcessCodeDev)){
            return res.status(401).send({error: 'Unauthorized to deleye team'});
        };
        await Team.findByIdAndDelete(req.params.idTeam);

        return res.send({ok: true});
    }catch(err){
        return res.send({
            error: 'Error deleting team'
        });
    };
});

module.exports = app => app.use('/data', router);