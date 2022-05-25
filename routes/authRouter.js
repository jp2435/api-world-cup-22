const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.post('/register', authController.createUser)
router.post('/authenticate', authController.loginUser)

module.exports = app => app.use('/auth', router)