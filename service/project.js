const projectRepo = require('../repository/project')
const roleRepo = require('../repository/role')
 
const create = async (element) => {
  const {userId, ...project} = element

  const createdProject = await projectRepo.create(project)
  await roleRepo.create({projectId: createdProject.id, userId, role: 'admin'})

  return createdProject
}

const get = async (id) => {
  return await projectRepo.get(id)
}

const getByUser = async (userId) => {
  return await projectRepo.getByUser(userId)
}

const update = async (id, element) => {
    return await projectRepo.update(id, element)
}

const remove = async (id) => {
    return await projectRepo.remove(id)
}

module.exports = {
  create,
  get,
  getByUser,
  update,
  remove
}