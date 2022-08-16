
const genericController = (repo) => {
  const getAll = async (req, res, next) => {
    try{
      const elements = await repo.getAll()
      res.status(200).json(elements)
    }catch(err){
      next(err)
    }
  }

  const get = async (req, res, next) => {
    const id = req.params.id
    try{
      const element = await repo.get(id)
      res.status(200).json(element)
    }catch(err){
      next(err)
    }
  }

  const create = async (req, res, next) => {
    const element = req.body
    try{
      const createdElement = await repo.create(element)
      res.status(200).json(createdElement)
    }catch(err){
      next(err)
    }
  }

  const update = async (req, res, next) => {
    const id = req.params.id
    const element = req.body
    try{
      const updatedElement = await repo.update(id, element)
      res.status(200).json(updatedElement)
    }catch(err){
      next(err)
    }
  }

  const remove = async (req, res, next) => {
    const id = req.params.id
    try{
      await repo.remove(id)
      res.status(200)
    }catch(err){
      next(err)
    }
  }
  return {
    getAll,
    get,
    create,
    update,
    remove
  }
}

module.exports = genericController