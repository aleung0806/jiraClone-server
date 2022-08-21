const express = require('express')
const userController = require('../controller/controller')

let userRouter = express.Router()

userRouter.get('/:id', userController.get)
userRouter.get('/getAllByProjectId/:projectId', userController.getAllByProjectId)
userRouter.put('/:id', userController.update)
userRouter.delete('/:id', userController.remove)


module.exports = authRouter