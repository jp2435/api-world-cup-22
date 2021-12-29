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
            error: 'Error creating group',
            log: err
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
            error: 'Error editing group',
            log: err
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
})


module.exports = app => app.use('/data', router);