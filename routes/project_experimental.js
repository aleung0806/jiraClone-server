const genericRouter = require('./generic')
const projectController = require('../controller/project')

const projectRouter = genericRouter(projectController)
module.exports = projectRouter