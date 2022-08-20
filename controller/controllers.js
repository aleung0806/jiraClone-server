const genericController = require('./generic')

const projectRepo = require('../repository/project')
const listRepo = require('../repository/list')
const issueRepo = require('../repository/issue')
const roleRepo = require('../repository/role')


const projectController = genericController(projectRepo)
const listController = genericController(listRepo)
const issueController = genericController(issueRepo)

const userController = genericController(userRepo)
const roleController = genericController(roleRepo)


module.exports = {
  projectController,
  listController,
  issueController,
  userController,
  roleController
}