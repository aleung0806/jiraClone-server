const issueRepo = require('../repository/issue')
const genericService = require('./generic')

const issueService = () => {

  const permissions = {
    create: 'member',
    getAllByProjectId: 'member',
    update: 'member',
    delete: 'member'
  }

  const service =  genericService(issueRepo, permissions)
  
  return service
}

module.exports = issueService()
