const express = require('express')
const userController = require('../controller/user')
const userRouter = express.Router()

userRouter.get('/:id', userController.get)
userRouter.put('/:id', userController.update)
userRouter.delete('/:id', userController.remove)

module.exports = userRouter