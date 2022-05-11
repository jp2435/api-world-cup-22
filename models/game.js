const mongoose = require('../database');
const bcrypt = require('bcrypt');

const GameSchema = new mongoose.Schema({
    typeGame:{
        type: String,
        required: true
    },
    homeTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    visitingTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    homeGoals: {
        type: String,
        default: 0
    },
    visitingGoals: {
        type: String,
        default: 0
    },
    local: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Game = mongoose.model('Game', GameSchema);

GameSchema.pre('save', (next) => {
    this.updateAt = Date.now()
    next()
})

module.exports = Game;