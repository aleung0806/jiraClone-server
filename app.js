const express = require('express')
const app = express()

const middleware = require('./utils/middleware')
const userRouter = require('./routes/user')
const projectRouter = require('./routes/project')
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/user', userRouter)
app.use('/project', projectRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app