const genericController = require('./generic')

// const projectService = require('../service/project')
// const listRepo = require('../service/list')
const issueRepo = require('../service/issue')
// const roleRepo = require('../service/role')

// const projectController = genericController(projectRepo)
// const listController = genericController(listRepo)
const issueController = genericController(issueRepo)
// const roleController = genericController(roleRepo)


module.exports = {
  // projectController,
  // listController,
  issueController,
  // roleController
}