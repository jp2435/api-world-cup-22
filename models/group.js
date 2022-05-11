const mongoose = require('../database');
const bcrypt = require('bcrypt');

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
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

const Group = mongoose.model('Group', GroupSchema);

GroupSchema.pre('save', (next) => {
    this.updatedAt = Date.now()
    next()
})

module.exports = Group;