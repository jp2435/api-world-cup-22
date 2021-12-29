const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

const Group = require('../models/group');
const Team = require('../models/team');
const Game = require('../models/game');

router.use(authMiddleware);


module.exports = app => app.use('/get', router);