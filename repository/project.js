const genericRepo = require('./generic')
const db = require('../db/db')
const { makeNested } = require('./makeNested')


let projectRepo = genericRepo('project')

projectRepo.getAll = async () => {
  let projects = await db
    .select('project.id as projectId', 'project.title as projectTitle', 'list.id as listId', 'list.title as listTitle', 'issue.*')
    .from('project')
    .leftJoin('list', 'project.id', 'list.projectId')
    .leftJoin('issue', 'list.id', 'issue.listId')
    .orderBy('issue.listId')
    .orderBy('issue.index')

  return makeNested('projects', projects)
}

projectRepo.get = async (projectId) => {
  let project = await db
    .select('project.id as projectId', 'project.title as projectTitle', 'list.id as listId', 'list.title as listTitle', 'issue.*')
    .from('project')
    .leftJoin('list', 'project.id', 'list.projectId')
    .leftJoin('issue', 'list.id', 'issue.listId')
    .orderBy('issue.listId')
    .orderBy('issue.index')
    .where('project.projectId', projectId)

  return makeNested('project', project)
}

module.exports = projectRepo