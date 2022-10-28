const logger = require('../logger')

const authenticate = (req, res, next) => {
  if (req.path.includes('/auth')){
    return
  } else if (req.session.userId){
    next()
  }else {
    res.status(401).send('you are not logged in')
  }
}

module.exports = authenticate