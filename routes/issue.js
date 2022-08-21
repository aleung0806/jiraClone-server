const express = require('express')
const issueController = require('../controller/issue')
let issueRouter = express.Router()

issueRouter.post('/', issueController.create)
issueRouter.get('/getAllByProjectId/:projectId', issueController.getAllByProjectId)
issueRouter.put('/:id', issueController.update)
issueRouter.delete('/:id', issueController.remove)

module.exports = issueRouter