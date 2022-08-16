const genericRouter = require('./generic')
const listController = require('../controller/list')

const listRouter = genericRouter(listController)

module.exports = listRouter