const genericRepo = require('./generic')

const userRepo = () => {

  let repo = genericRepo('user')
  return repo

}

module.exports = userRepo