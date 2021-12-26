const mongoose = require('../database');
const bcrypt = require('bcrypt');

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;