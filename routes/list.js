const express = require('express')
const listController = require('../controllers/list')
let listRouter = express.Router()

listRouter.post('/', listController.create)
listRouter.get('/getAllByProjectId/:projectId', listController.getAllByProjectId)
listRouter.put('/:id', listController.update)
listRouter.delete('/:id', listController.remove)
