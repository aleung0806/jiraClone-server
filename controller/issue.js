const issueService = require('../service/issue')
const genericController = require('./generic')

const issueController = () => {

  const validation = {
    create : (req, res, next) => {
      const issue = req.body
      if (!('title' in issue && 'projectId' in issue && 'listId' in issue && 'index' in issue)){
        next('issue to create incomplete')
      }
    },
    getAllByProjectId : (req, res, next) => {
      const projectId = req.params.projectId
      if (typeof projectId === 'undefined'){
        next('specify projectId')
      }
    },
    update : (req, res, next) => {
    },
    remove : (req, res, next) => {
    }
  }

  let controller = genericController(issueService, validation)

  return controller
}


module.exports = issueController