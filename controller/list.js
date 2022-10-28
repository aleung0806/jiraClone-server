const listService  = require('../service/list')
const permissionService = require('../service/permissions')

const create = async (req, res, next) => {
  const element = req.body
  const projectId = element.projectId
  const userId = req.session.userId
  
  if (!(projectId && element.title)) {
    return res.status(400).send('more info needed')
  }


  const permitted = await permissionService.isMember(userId, projectId, 'project')
  if (!permitted){
    return res.status(401).send('permission denied')
  }

  try{
    const createdElement = await listService.create(element)
    res.status(200).json(createdElement)
  }catch(err){
    next(err)
  }
}


const update = async (req, res, next) => {
  const id = req.params.id
  const element = req.body
  const userId = req.session.userId

  const permitted = await permissionService.isMember(userId, id, 'list')
  if (!permitted){
    return res.status(401).send('permission denied')
  }

  try{
    const updatedElement = await listService.update(id, element)
    res.status(200).json(updatedElement)
  }catch(err){
    next(err)
  }
}

const remove = async (req, res, next) => {
  const id = req.params.id
  const userId = req.session.userId

  const permitted = await permissionService.isAdmin(userId, id, 'list')
  if (!permitted){
    return res.status(401).send('permission denied')
  }

  try{
    await listService.remove(id)
    res.sendStatus(200)
  }catch(err){
    console.log(err)
    next(err)
  }
}


module.exports = {
  create,
  update,
  remove
}