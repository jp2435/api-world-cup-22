const mongoose = require('../database');
const bcrypt = require('bcrypt');

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    continent: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true,
    },
    points: {
        type: Number,
        default: 0
    },
    goalsFor: {
        type: Number,
        default: 0
    },
    goalsAgainst: {
        type: Number,
        default: 0
    },
    games: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    }],
    gamesPlayed: {
        type: Number,
        default: 0
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
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

const Team = mongoose.model('Team', TeamSchema);

TeamSchema.pre('save', (next) => {
    this.updatedAt = Date.now()
    next()
})

module.exports = Team;