const session = require('express-session');


module.exports = (sessionStore) => {
  
  return session({
    store: sessionStore,
    secret: 'mySecret',
    saveUninitialized: false,
    resave: false,
    name: 'sessionId',
    cookie: {
      secure: false,
      httpOnly: true, 
      maxAge: 1000 * 60 * 60 * 24, 
      sameSite: 'lax',
    },
  })
}

