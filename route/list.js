const express = require('express')
const listController = require('../controller/list')
const listRouter = express.Router()

listRouter.post('/', listController.create)
listRouter.put('/:id', listController.update)
listRouter.delete('/:id', listController.remove)

module.exports = listRouter