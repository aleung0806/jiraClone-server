const genericController = require('./generic')
const listRepo = require('../repository/list')

const listController = genericController(listRepo)

module.exports = listController