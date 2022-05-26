const Group = require('../models/group');
const Team = require('../models/team');
const Game = require('../models/game');

const AcessCodeDevEnv = process.env.ACESSCODEDEV


// Group Data
exports.createGroup = async(req,res) => {
    try{
        const { AcessCodeDev } = req.body;
        if(!(AcessCodeDev==AcessCodeDevEnv)){
            return res.status(401).send({error: 'Unauthorized to create group'});
        };
        const group = await Group.create(req.body);
        return res.send({ group });
    }catch(err){
        return res.status(400).send({
            error: 'Error creating group'
        });
    };
};
exports.editGroup = async(req,res) => {
    try{
        const { AcessCodeDev } = req.body;
        if(!(AcessCodeDev==AcessCodeDevEnv)){
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
};
exports.deleteGroup = async(req,res) => {
    try{
        const { AcessCodeDev } = req.body;
        if(!(AcessCodeDev==AcessCodeDevEnv)){
            return res.status(401).send({error: 'Unauthorized to delete group'});
        };
        
        await Group.findByIdAndDelete(req.params.idGroup);

        return res.send({ok: true})
    }catch(err){
        return res.status(400).send({
            error: 'Error deleting group'
        })
    }
};

// Team Data
exports.createTeam = async(req,res) => {
    try{
        const { name, group, AcessCodeDev } = req.body;
        if(!(AcessCodeDev==AcessCodeDevEnv)){
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
};
exports.editTeam = async(req,res) => {
    try{
        const { AcessCodeDev } = req.body;
        if(!(AcessCodeDev==AcessCodeDevEnv)){
            return res.status(401).send({error: 'Unauthorized to edit team'});
        };
        const team = await Team.findByIdAndUpdate(req.params.idTeam, {...req.body}, {new: true}).populate('group');
        
        return res.send({team});
    }catch(err){
        return res.status(400).send({
            error: 'Error editing team'
        });
    };
};
exports.deleteTeam = async(req,res) => {
    try{
        const { AcessCodeDev } = req.body;
        if(!(AcessCodeDev==AcessCodeDevEnv)){
            return res.status(401).send({error: 'Unauthorized to delete team'});
        };
        await Team.findByIdAndDelete(req.params.idTeam);

        return res.send({ok: true});
    }catch(err){
        return res.send({
            error: 'Error deleting team'
        });
    };
};

// Game Data
exports.createGame = async(req,res) => {
    try{
        const {typeGame, homeTeam, visitingTeam, date, local, AcessCodeDev} = req.body;
        if(!(AcessCodeDev==AcessCodeDevEnv)){
            return res.status(401).send({error: 'Unauthorized to create game'});
        };
        const homeTeamReq = await Team.findOne({name: homeTeam});
        const visitingTeamReq = await Team.findOne({name: visitingTeam});
        
        const game = await Game.create({ typeGame: typeGame, homeTeam: homeTeamReq._id, visitingTeam: visitingTeamReq._id, local: local, date: date});

        await homeTeamReq.games.push(game);
        await homeTeamReq.save();
        await visitingTeamReq.games.push(game);
        await visitingTeamReq.save();

        return res.send({game});
    }catch(err){
        console.log(err)
        return res.status(400).send({
            error: 'Error creating game'
        });
    };
};
exports.editGame = async(req,res) => {
    try{
        const {AcessCodeDev} = req.body;
        if(!(AcessCodeDev==AcessCodeDevEnv)){
            return res.status(401).send({error: 'Unauthorized to edit game'});
        };
        const game = await Game.findByIdAndUpdate(req.params.idGame, {...req.body}, {new:true});
        
        return res.send({game});
    }catch(err){
        return res.status(400).send({
            error: 'Error editing game'
        });
    };
};
exports.deleteGame = async(req,res) => {
    try{
        const {AcessCodeDev} = req.body;
        if(!(AcessCodeDev==AcessCodeDevEnv)){
            return res.status(401).send({error: 'Unauthorized to delete game'});
        };
        await Game.findByIdAndDelete(req.params.idGame);
        return res.send({ok: true});
    }catch(err){
        return res.status(400).send({
            error: 'Error deleting game'
        });
    };
};