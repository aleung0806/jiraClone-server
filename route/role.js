const express = require('express')
const roleController = require('../controller/role')
const roleRouter = express.Router()

roleRouter.post('/', roleController.create)
roleRouter.put('/:id', roleController.update)
roleRouter.delete('/:id', roleController.remove)

module.exports = roleRouter

