const repo = require('../repository/user')
const _ = require('lodash')

const get = async (projectId) => {
  const user = await repo.get(projectId)
  return _.pick(user, ['id', 'firstName', 'lastName', 'email'])
}

const update = async (id, element) => {
    const user = await repo.update(id, element)
    return _.pick(user, ['id', 'firstName', 'lastName', 'email'])
}

const remove = async (id) => {
    return await repo.remove(id)
}

module.exports = {
  get,
  update,
  remove
}