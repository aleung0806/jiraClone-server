const genericRepo = require('./generic')
const db = require('../db/db')
const makeNested = require('./makeNested')

const projectRepo = () => {
  let repo = genericRepo('project')

  repo.getByUser = async (userId) => {
    console.log(`project repo getByUser ${userId}`)

    const records = await db
      .select(        
        'project.id as id',
        'project.title as title',
        'role.role as role'
      )
      .from('project')
      .leftJoin('role', 'project.id', 'role.projectId')
      .where('userId', userId)

      if (records.length > 0){
        return records
      }else{
        throw new Error('not found in db')
      }
  }

  repo.get = async (projectId) => {
    const project = await db
      .select(
        'project.id as projectId', 
        'project.title as projectTitle', 
        'list.id as listId', 
        'list.title as listTitle', 
        'issue.id as issueId',
        'issue.title as issueTitle',

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
      .leftJoin('list', 'project.id', 'list.projectId')
      .leftJoin('issue', 'list.id', 'issue.listId')
      .where('project.id', projectId)
      .leftJoin('user as creator', 'issue.creatorId', 'creator.id')
      .leftJoin('user as assignee', 'issue.assigneeId', 'assignee.id')

      .orderBy('issue.listId')
      .orderBy('issue.index')
    
    console.log(JSON.stringify(project, null, 2))

    if (project.length === 0){
      return new Error('not found in db')
    }

    return makeNested.projectGet(project)

  }

  return repo

}




module.exports = projectRepo()