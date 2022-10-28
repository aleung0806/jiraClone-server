const repo = require('../repository/issue')
 

const create = async (element) => {
  return await repo.create(element)
}

const get = async (id) => {
  return await repo.get(id)
}

const update = async (id, element) => {
    return await repo.update(id, element)
}

const remove = async (id) => {
    return await repo.remove(id)
}

module.exports = {
  create,
  get,
  update,
  remove
}