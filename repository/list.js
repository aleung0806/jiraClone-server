const genericRepo = require('./generic')
const db = require('../db/db')

const listRepo = genericRepo('list')

module.exports = listRepo