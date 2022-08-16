const db = require('../db/db')
const { makeNested } = require('./makeNested')

const getAllProjects = async () => {
  let projects = await db
    .select('project.id as projectId', 'project.title as projectTitle', 'list.id as listId', 'list.title as listTitle', 'issue.*')
    .from('project')
    .leftJoin('list', 'project.id', 'list.projectId')
    .leftJoin('issue', 'list.id', 'issue.listId')
    .orderBy('issue.listId')
    .orderBy('issue.index')

  return makeNested('projects', projects)
}

const getProjectById = async (projectId) => {
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

const createProject = async (project) => {
  let updatedProject = await db('project')
    .insert(project)
    .returning('*')

  return updatedProject
}
const updateProject = async (projectId, project) => {
  let updatedProject = await db('project')
    .where('projectId', projectId)
    .update(project)
    .returning('*')

  return updatedProject
}

const deleteProject = async (projectId, project) => {
  await db('project')
    .where('projectId', projectId)
    .del()

  return 
}

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject

}