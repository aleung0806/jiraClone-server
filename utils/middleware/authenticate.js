const logger = require('../logger')

const authenticate = (req, res, next) => {
  if (req.session.userId){
    next()
  }
  else {
    next('you are not logged in')
  }
}

module.exports = authenticate