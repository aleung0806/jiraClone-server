const projectRepository  = require('../repository/project')

const getAllProjects = async (req, res, next) => {
  try{
    const projects = await projectRepository.getAllProjects()
    res.status(200).json(projects)
  }catch(err){
    next(err)
  }
}

const getProjectById = async (req, res, next) => {
  const id = req.params.id
  try{
    const project = await projectRepository.getProjectById(id)
    res.status(200).json(project)
  }catch(err){
    next(err)
  }
}

const createProject = async (req, res, next) => {
  const project = req.body
  try{
    const createdProject = await projectRepository.createProject(project)
    res.status(200).json(createdProject)
  }catch(err){
    next(err)
  }
}

const updateProject = async (req, res, next) => {
  const projectId = req.params.id
  const project = req.body
  try{
    const updatedProject = await projectRepository.updateProject(projectId, project)
    res.status(200).json(updatedProject)
  }catch(err){
    next(err)
  }
}

const deleteProject = async (req, res, next) => {
  const id = req.params.id
  try{
    const projects = await projectRepository.deleteProject(id)
    res.status(200).json(projects)
  }catch(err){
    next(err)
  }
}

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
}