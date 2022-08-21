const genericRepo = require('./generic')
const db = require('../db/db')
const { makeNested } = require('./makeNested')

const projectRepo = () => {
  let repo = genericRepo('project')

  repo.getByUserId = async () => {
 
  }

  repo.get = async (projectId) => {
    const project = await db
      .select(
        'project.id as projectId', 
        'project.title as projectTitle', 
        'list.id as listId', 
        'list.title as listTitle', 
        'issue.*',
        'creator.id as creatorId',
        'creator.firstName as creatorFirst',
        'creator.lastName as creatorLast',
        'creator.email as creatorEmail',
        'assignee.id as assigneeId',
        'assignee.firstName as assigneeFirst',
        'assignee.lastName as assigneeLast',
        'assignee.email as assigneeEmail',
        )
      .from('project')
      .where('project.id', projectId)

      .leftJoin('list', 'project.id', 'list.projectId')
      .leftJoin('issue', 'list.id', 'issue.listId')
      .leftJoin('user as creator', 'issue.creatorId', 'creator.id')
      .leftJoin('user as assignee', 'issue.assigneeId', 'assignee.id')

      .orderBy('issue.listId')
      .orderBy('issue.index')
    
    if (project.length === 0){
      return new Error()
    }
    return makeNested('project', project)

  }

  return repo

}




module.exports = projectRepo