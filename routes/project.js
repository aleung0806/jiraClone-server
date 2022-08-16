const express = require('express')
const projectController = require('../controller/project')

const projectRouter = express.Router()

projectRouter.get('/', projectController.getAllProjects)
projectRouter.get('/:id', projectController.getProjectById)
projectRouter.post('/', projectController.createProject)
projectRouter.put('/:id', projectController.updateProject)
projectRouter.delete('/:id', projectController.deleteProject)

module.exports = projectRouter