const logger = require('../logger')

const authenticate = (req, res, next) => {
  if (req.session.email){
    next()
  }
  else {
  }
  
}

module.exports = authenticate