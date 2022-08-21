const logger = require('../logger')


const errorHandler = (error, request, response, next) => {
  console.log('errorHandler', error)
  if (error === 'you must be logged in to do that'){
    return response.sendStatus(401)
  }else if (error === 'not found') {
    return response.sendStatus(404)
  }else if (error === 'you are not logged in') {
    return response.sendStatus(401)
  }
  // if (error.name === 'CastError') {
  //   return response.status(400).send({ error: 'malformatted id' })
  // } else if (error.name === 'ValidationError') {
  //   return response.status(400).json({ error: error.message })
  // } else if (error.name === 'JsonWebTokenError') {
  //   return response.status(401).json({
  //     error: 'invalid token'
  //   })
  // } else {
    
  // }

  // next(error)
  else{
    response.status(400).send()

  }
}

module.exports = errorHandler