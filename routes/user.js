const express = require('express')
const userController = require('../controller/user')

const usersRouter = express.Router()

usersRouter.post('/', userController.createUser)


module.exports = usersRouter