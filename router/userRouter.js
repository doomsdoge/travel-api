const express = require('express')
const Router = express.Router()

// import controller
const { userController } = require('../controller')

// Router method
Router.post('/register', userController.register)
Router.get('/login', userController.login)

module.exports = Router