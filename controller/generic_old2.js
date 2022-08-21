
const genericController = (service) => {
  const create = async (req, res, next) => {
    const element = req.body
    console.log('generic create', element)

    try{
      const createdElement = await service.create(element, req.session.id)
      res.status(200).json(createdElement)
    }catch(err){
      next(err)
    }
  }

  const get = async (req, res, next) => {
    const id = req.params.id
    try{
      const element = await service.get(id, req.session.id)
      if (element.length === 0){
        next('not found')
      }else{
        res.status(200).json(element)
      }
    }catch(err){
      next(err)
    }
  }

  const getAll = async (req, res, next) => {
    try{
      const elements = await service.getAllByProjectId()
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
    try{
      const updatedElement = await service.update(id, element)
      res.status(200).json(updatedElement)
    }catch(err){
      next(err)
    }
  }

  const remove = async (req, res, next) => {
    const id = req.params.id
    try{
      await service.remove(id)
      res.sendStatus(200)
    }catch(err){
      next(err)
    }
  }
  return {
    create,
    get,
    getAll,
    update,
    remove
  }
}

module.exports = genericController