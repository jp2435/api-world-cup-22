const express = require('express')
const router = express.Router()
const authMidd = require('../middleware/auth')
const dataController = require('../controllers/dataController')

router.use(authMidd)

// Route Game
router.post('/group', dataController.createGroup)
router.put('/group/:idGroup', dataController.editGroup)
router.delete('/group/:idGroup', dataController.deleteGroup)
// Route Team
router.post('/team', dataController.createTeam)
router.put('/team/:idTeam', dataController.editTeam)
router.delete('/team/:idTeam', dataController.deleteTeam)
// Route Game
router.post('/game', dataController.createGame)
router.put('/game/:idGame', dataController.editGame)
router.delete('/game/:idGame', dataController)

module.exports = app => app.use('/data', router)