
const { isRole } = require('./getRoles')

const config = require('../generic.config')

const genericService = (repo) => {

  const create = async (element) => {
      return await repo.create(element)
  }

  const getAllByProjectId = async (projectId) => {
    return await repo.getAllByProjectId(projectId)
  }

  const update = async (element) => {
      return await repo.update(id, element)
  }

  const remove = async (element) => {
      return await repo.remove(element.id)
  }

  const checkPermissions = async (element, userId, serviceFunction) => {
    console.log('in checkPermissions', element)
    if (! serviceFunction.name in config){
      return serviceFunction(element, userId)
    }

    let projectId = element
    if (typeof element !== 'string'){
      projectId = element.projectId
    }
    const role = permissions.create
    const permitted =  await isRole(projectId, userId, role)
    if (!permitted){
      throw new Error('unauthorized')
    }
    return serviceFunction(element, userId)
  }

  const authorize = (serviceFunction) => {
    return async (element, userId) => {
      return await checkPermissions(element, userId, serviceFunction)
    }
  }

  return {
    create: authorize(create),
    getAllByProjectId: authorize(getAllByProjectId),
    update: authorize(update),
    remove: authorize(remove)
  }

}

  
module.exports = genericService