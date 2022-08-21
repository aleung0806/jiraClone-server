const issueRepo = require('../repository/issue')
const { isMember, isAdmin } = require('./permissions')


const create = async (issue, userId) => {
    return await issueRepo.create(issue)
}

const getAllByProjectId = async (projectId, userId) => {
  if (await isMember(userId, projectId)){
    return await issueRepo.getAllByProjectId(projectId)
  }
}

const update = async (id, issue, userId) => {
  if (await isMember(userId, issue.projectId)){
    return await issueRepo.update(id, issue)
  }
}

const remove = async (id, userId) => {
  if (await isMember(userId, issue.projectId)){
    return await issueRepo.update(id, issue)
  }
}

  
module.exports = {
  getAllByProjectId,
  create,
  update,
  remove
}