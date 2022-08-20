const express = require('express')
const redis = require("redis")

const requestLogger = require('./utils/middleware/requestLogger')
const unknownEndpoint = require('./utils/middleware/unknownEndpoint')
const errorHandler= require('./utils/middleware/errorHandler')
const authenticate = require("./utils/middleware/authenticate")

const { 
  userRouter, 
  roleRouter, 
  projectRouter, 
  listRouter, 
  issueRouter
 } = require('./routes/routes')

 const authRouter = require('./routes/auth')


const session = require('express-session')
const redisStore = require('connect-redis')(session)


const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379,
  legacyMode: true
})

redisClient.connect()
  .then(() => {
    console.log('connected to redis')
  })
  .catch(() => {
    console.log('not connected to redis')
  })

const store = new redisStore({client: redisClient})


const app = express()
app.use(express.json())
app.use(requestLogger)

app.use(session({
      store: store,
      secret: 'mySecret',
      saveUninitialized: false,
      resave: false,
      name: 'sessionId',
      cookie: {
        secure: false,
        httpOnly: true, 
        maxAge: 1000 * 60 * 60,
        sameSite: 'lax',
      },
    })
)
app.use('/clear', async (req, res, next) => {
  console.log('testing')
  store.clear((error) => {
    console.log('sessions cleared')
    res.sendStatus(200)
  })
  
})
app.use('/show', async (req, res, next) => {
  console.log('testing')
  store.all((error, sessions) => {
    console.log('all sessions', sessions)
    res.sendStatus(200)

  })
  
})
app.use('/auth', authRouter)

app.use(authenticate)

app.use('./user', userRouter)
app.use('./role', roleRouter)

app.use('/project', projectRouter)
app.use('/list', listRouter)
app.use('/issue', issueRouter)


app.use(errorHandler)
app.use(unknownEndpoint)


module.exports = app