const express = require('express')
const projectController = require('../controller/project')
const projectRouter = express.Router()

projectRouter.post('/', projectController.create)
projectRouter.get('/:id', projectController.get)
projectRouter.get('/userId/:userId', projectController.getByUser)
projectRouter.put('/:id', projectController.update)
projectRouter.delete('/:id', projectController.remove)

module.exports = projectRouter