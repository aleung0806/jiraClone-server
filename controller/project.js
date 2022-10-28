const projectService  = require('../service/project')
const permissionService = require('../service/permissions')

const create = async (req, res, next) => {
  const element = req.body
  const userId = req.session.userId

  try{
    const createdElement = await projectService.create({userId, ...element})
    res.status(200).json(createdElement)
  }catch(err){
    next(err)
  }
}

const get = async (req, res, next) => {
  const id = req.params.id
  const userId = req.session.userId

  const permitted = await permissionService.isMember(userId, id, 'project')
  if (!permitted){
    return res.status(401).send('permission denied')
  }

  try{
    const element = await projectService.get(id)
    res.status(200).json(element)
  }catch(err){
    next(err)
  }
}

const getByUser = async (req, res, next) => {
  const userId = req.params.userId

  if (req.session.userId != userId){
    return res.status(401).send('permission denied')
  }

  try{
    const elements = await projectService.getByUser(userId)
    res.status(200).json(elements)

  }catch(err){
    next(err)
  }
}

const update = async (req, res, next) => {
  const id = req.params.id
  const element = req.body
  const userId = req.session.userId

  const permitted = await permissionService.isMember(userId, id, 'project')
  if (!permitted){
    return res.status(401).send('permission denied')
  }

  try{
    const updatedElement = await projectService.update(id, element)
    res.status(200).json(updatedElement)
  }catch(err){
    next(err)
  }
}

const remove = async (req, res, next) => {
  const id = req.params.id
  const userId = req.session.userId

  const permitted = await permissionService.isAdmin(userId, id, 'project')
  if (!permitted){
    return res.status(401).send('permission denied')
  }

  try{
    await projectService.remove(id)
    res.sendStatus(200)
  }catch(err){
    console.log(err)
    next(err)
  }
}


module.exports = {
  create,
  get,
  getByUser,
  update,
  remove
}