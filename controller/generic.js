const config = require('../generic.config')

const genericController = (service, valid) => {

  const create = async (req, res, next) => {
    const element = req.body.element
    const { userId, email }= req.session
    console.log(`element create ${element.title} by ${email} (${userId})`)

    try{
      const createdElement = await service.create(element, userId)
      res.status(200).json(createdElement)
    }catch(err){
      next(err)
    }
  }

  const get = async (req, res, next) => {
    const id = req.params.id

    try{
      const element = await service.get(id, req.session.id)
      res.status(200).json(element)
    }catch(err){
      next(err)
    }
  }

  const getAllByProjectId = async (req, res, next) => {
    const projectId = req.params.projectId
    const { userId, email }= req.session
    console.log(`element getAllByProjectId ${projectId} by ${email} (${userId})`)

    try{
      const elements = await service.get(projectId, userId)
      if (elements.length === 0){
        next('not found')
      }else{
        res.status(200).json(elements)
      }
    }catch(err){
      next(err)
    }
  }

  const update = async (req, res, next) => {
    const id = req.params.id
    const element = req.body
    const { userId, email }= req.session
    console.log(`element update ${id} by ${email} (${userId})`)

    try{
      const updatedElement = await service.update(element, userId)
      res.status(200).json(updatedElement)
    }catch(err){
      next(err)
    }
  }

  const remove = async (req, res, next) => {
    const id = req.params.id
    const element = req.body
    const { userId, email }= req.session

    console.log(`element remove ${id} by ${email} (id ${userId})`)

    try{
      await service.remove(element, userId)
      res.sendStatus(200)
    }catch(err){
      next(err)
    }
  }

  const validate = (validation, controllerFunction) => {
    return async () => {
      await validation(req, res, next)
      return await controllerFunction(req, res, next)
    }
  }

  return {
    ...(create in config ? {create: validate(valid.create, create)} : {}),
    ...(get in config ? {get: validate(valid.get, get)} : {}),
    ...(getAllByProjectId in config ? {getAllByProjectId: validate(valid.getAllByProjectId, getAllByProjectId)} : {}),
    ...(update in config ? {update: validate(valid.update, update)} : {}),
    ...(remove in config ? {remove: validate(valid.remove, remove)} : {})
    
  }
}

module.exports = genericController