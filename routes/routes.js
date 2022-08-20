const genericRouter = require('./generic')

const { 
  projectController,
  listController,
  issueController,
  roleController,
  
} = require('../controller/controllers')


const userController = require('../controller/user')

const projectRouter = genericRouter(projectController)
const listRouter = genericRouter(listController)
const issueRouter = genericRouter(issueController)
const userRouter = genericRouter(userController)
const roleRouter = genericRouter(roleController)

module.exports = {
  projectRouter,
  listRouter,
  issueRouter,
  userRouter,
  roleRouter,
}