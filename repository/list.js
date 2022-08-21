const genericRepo = require('./generic')

const listRepo = () => {

  let repo = genericRepo('list', config)

  repo.getAllByProjectId = async () => {
 
  }


  return repo
}

module.exports = listRepo