const genericController = require('./generic')
const listRepo = require('../repository/list')
const projectRepo = require('../repository/project')
const issueRepo = require('../repository/issue')

const projectController = genericController(projectRepo)
const listController = genericController(listRepo)
const issueController = genericController(issueRepo)


module.exports = {
  projectController,
  listController,
  issueController
}