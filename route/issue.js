const express = require('express')
const issueController = require('../controller/issue')
const issueRouter = express.Router()

issueRouter.post('/', issueController.create)
issueRouter.get('/:id', issueController.get)
issueRouter.put('/:id', issueController.update)
issueRouter.delete('/:id', issueController.remove)

module.exports = issueRouter