const logger = require('../logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('User:  ', request.session.userId)
  logger.info('---')
  next()
}

module.exports = requestLogger