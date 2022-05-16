const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

const Group = require('../models/group');
const Team = require('../models/team');
const Game = require('../models/game');


// Group Get Routes
exports.getGroupByParameter = async(req,res) => {
    try{
        const group = await Group.findById(req.params.idGroup);
        const teams = await Team.find({group: group._id});

        const response = {
            group: {
                id: group._id,
                name: group.name,
                createdAT: group.createdAt
            },
            teams: teams.map(team => {
                return {
                    id: team._id,
                    name: team.name,
                    continent: team.continent,
                    status: team.status ? 'Participating' : 'Disqualified',
                    points: team.points,
                    goalsFor: team.goalsFor,
                    goalsAgainst: team.goalsAgainst,
                    gamesPlayed: team.gamesPlayed,
                    createdAt: team.createdAt
                }
            }),
            request: {
                type: 'GET',
                url: req.baseUrl + req.url
            }
        }

        return res.send(response);
    }catch(err){
        return res.status(400).send({
            error: `Error getting group with id:${req.params.idGroup}`
        });
    };
};
exports.getGroupByQuery = async(req,res) => {
    try{
        if(req.query.name == undefined){
            return res.status(400).send({
                error: 'Error no query declared'
            });
        };
        const group = await Group.findOne({name: req.query.name});
        const teams = await Team.find({group: group._id});

        const response = {
            group: {
                id: group._id,
                name: group.name,
                createdAT: group.createdAt
            },
            teams: teams.map(team => {
                return {
                    id: team._id,
                    name: team.name,
                    continent: team.continent,
                    status: team.status ? 'Participating' : 'Disqualified',
                    points: team.points,
                    goalsFor: team.goalsFor,
                    goalsAgainst: team.goalsAgainst,
                    gamesPlayed: team.gamesPlayed,
                    createdAt: team.createdAt
                }
            }),
            request: {
                type: 'GET',
                url: req.baseUrl + req.url
            }
        }

        return res.send(response);
    }catch(err){
        return res.status(400).send({
            error: `Error getting group with name: ${req.query.name}`
        });
    };
};
exports.getGroups = async(req,res) => {
    try{
        const groups = await Group.find();

        const reponse = {
            groups: groups.map(group => {
                return {
                    id: group._id,
                    name: group.name,
                    createdAt: group.createdAt
                }
            }),
            request: {
                type: 'GET',
                url: req.baseUrl + req.url
            }
        }
        return res.send(reponse);
    }catch(err){
        return res.status(400).send({
            error: 'Error getting all groups'
        });
    };
};

// Team Get Routes
exports.getTeamByParameter = async(req,res) => {
    try{
        const team = await Team.findById(req.params.idTeam).populate(['group', 'games']);
        if(!team) throw new Error

        const response = {
            team: {
                id: team._id,
                name: team.name,
                continent: team.continent,
                status: team.status ? 'Participating' : 'Disqualified',
                points: team.points,
                goalsFor: team.goalsFor,
                goalsAgainst: team.goalsAgainst,
                gamesPlayed: team.gamesPlayed,
                group: {
                    id: team.group._id,
                    name: team.group.name
                },
                updatedAt: team.updatedAt
            }
        }

        if(req.query.wgames == 1){
            response.games = team.games.map(game => {
                return {
                    id: game._id,
                    typeGame: game.typeGame,
                    date: game.date,
                    updatedAt: game.updatedAt
                }
            })
        }
        response.request = {
            type: 'GET',
            url: req.baseUrl + req.url
        }

        return res.send(response);
    }catch(err){
        return res.status(400).send({
            error: `Error getting team with id:${req.params.idTeam}`
        });
    };
};
exports.getTeamByQuery = async(req,res) => {
    try{
        if(req.query.name == undefined){
            return res.status(400).send({
                error: 'Error no query declared'
            });
        };
        const name = req.query.name.charAt(0).toUpperCase() + req.query.name.slice(1);
        const team = await Team.findOne({name: name}).populate(['group', 'games']);
        
        if(!team) throw new Error

        const response = {
            team: {
                id: team._id,
                name: team.name,
                continent: team.continent,
                status: team.status ? 'Participating' : 'Disqualified',
                points: team.points,
                goalsFor: team.goalsFor,
                goalsAgainst: team.goalsAgainst,
                gamesPlayed: team.gamesPlayed,
                group: {
                    id: team.group._id,
                    name: team.group.name
                },
                updatedAt: team.updatedAt
            }
        }
        if(req.query.wgames == 1){
            response.games = team.games.map(game => {
                return {
                    id: game._id,
                    typeGame: game.typeGame,
                    date: game.date,
                    updatedAt: game.updatedAt
                }
            })
        }

        response.request = {
            type: 'GET',
            url: req.baseUrl + req.url
        }

        return res.send(response);
        
    }catch(err){
        return res.status(400).send({
            error: `Error getting team with name: ${req.query.name}`
        });
    };
};

exports.getTeams = async(req,res) => {
    try{
        if(!(req.query.group == undefined)){
            const group = await Group.findOne({name: req.query.group});
            const teams = await Team.find({group: group._id});

            const response = {
                teams: teams.map(team => {
                    return {
                        id: team._id,
                        name: team.name,
                        continent: team.continent,
                        status: team.status ? 'Participating' : 'Disqualified',
                        points: team.points,
                        goalsFor: team.goalsFor,
                        goalsAgainst: team.goalsAgainst,
                        games: team.games,
                        gamesPlayed: team.gamesPlayed,
                        updatedAt: team.updatedAt
                    }
                }),
                group: {
                    id: group.id,
                    name: group.name,
                    updatedAt: group.updatedAt
                },
                request: {
                    type: 'GET',
                    url: req.baseUrl + req.url
                }
            }
            
            return res.send(response);
        };
        const teams = await Team.find().populate('group');
        
        const response = {
            teams: teams.map(team => {
                return {
                    id: team._id,
                    name: team.name,
                    continent: team.continent,
                    status: team.status ? 'Participating' : 'Disqualified',
                    points: team.points,
                    goalsFor: team.goalsFor,
                    goalsAgainst: team.goalsAgainst,
                    games: team.games,
                    gamesPlayed: team.gamesPlayed,
                    group: {
                        id: team.group._id,
                        name: team.group.name
                    },
                    updatedAt: team.updatedAt
                }
            }),
            request: {
                type: 'GET',
                url: req.baseUrl + req.url
            }
        }

        return res.send(response);
    }catch(err){
        return res.status(400).send({
            error: 'Error getting all teams'
        });
    };
};

// Game Get Routes
exports.getGameByParameter = async(req,res) => {
    try{
        const game = await Game.findById(req.params.idGame).populate(['homeTeam', 'visitingTeam']);
        if(!game) throw new Error
        const ResponseTeam = (team) => {
            return {
                id: team._id,
                name: team.name,
                continent: team.continent,
                status: team.status ? 'Participating' : 'Disqualified',
                points: team.points,
                goalsFor: team.goalsFor,
                goalsAgainst: team.goalsAgainst,
                gamesPlayed: team.gamesPlayed,
                group: team.group,
                updatedAt: team.updatedAt
            }
        }

        const homeTeam = ResponseTeam(game.homeTeam)
        const visitingTeam = ResponseTeam(game.visitingTeam)

        const response = {
            game: {
                id: game._id,
                typeGame: game.typeGame,
                local: game.local,
                date: game.date,
                homeGoals: game.homeGoals,
                visitingGoals: game.visitingGoals,
                updatedAt: game.updatedAt
            },
            homeTeam: homeTeam,
            vistingTeam: visitingTeam,
            request: {
                type: 'GET',
                url: req.baseUrl + req.url
            }
        }

        return res.send(response);
    }catch(err){
        return res.status(400).send({
            error: `Error getting game with id:${req.params.idGame}`
        })
    };
};

exports.getGames = async(req,res) => {
    try{
        const games = await Game.find().populate(['homeTeam', 'visitingTeam']);

        const ResponseTeam = (team) => {
            return {
                id: team._id,
                name: team.name,
                continent: team.continent,
                points: team.points,
                group: team.group,
                updatedAt: team.updatedAt
            }
        }

        const response = {
            games: games.map(game => {
                const homeTeam = ResponseTeam(game.homeTeam)
                const visitingTeam = ResponseTeam(game.visitingTeam)
                return {
                    id: game._id,
                    typeGame: game.typeGame,
                    local: game.local,
                    date: game.date,
                    homeGoals: game.homeGoals,
                    visitingGoals: game.visitingGoals,
                    homeTeam: homeTeam,
                    visitingTeam: visitingTeam,
                    updatedAt: game.updatedAt
                }
            }),
            request: {
                type: 'GET',
                url: req.baseUrl + req.url
            }
        }

        return res.send(response);
    }catch(err){
        return res.status(400).send({
            error: 'Error getting all games'
        });
    };
};