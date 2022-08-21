const express = require('express')

const genericRouter = (controller) => {
  const router = express.Router()

  router.post('/', controller.create)
  router.get('/:id', controller.get)
  router.get('/getAllByProjectId/:id', controller.getAllByProjectId)
  router.get('/getAllByUserId/:id', controller.getAllByUserId)
  router.put('/:id', controller.update)
  router.delete('/:id', controller.remove)

  return router
}

module.exports = genericRouter