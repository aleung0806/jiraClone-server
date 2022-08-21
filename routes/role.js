const express = require('express')
const { create } = require('../controller/role')
let roleRouter = express.Router()

roleRouter.post('/', create)

module.exports = roleRouter

