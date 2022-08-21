const authService = require('../service/auth')

  const register = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body
    try{
      const user = await authService.register(firstName, lastName, email, password)
      console.log(user)
      res.status(201).json({id: user.id, email, firstName, lastName})
    }catch(err){
      next(err)
    }
  }

  const login = async (req, res, next) => {
    const { email, password } = req.body
    console.log(`login request from ${email} with ${password}`)
    if (!email || !password){
    }
    try{
      const user = await authService.login(email, password)
      req.session.regenerate((err) => {
        if (err) next(err)
        req.session.email = user.email
        req.session.userId = user.id

        req.session.save((err) => {
          if (err) next(err)
          console.log(`${req.session.email} session saved`)
          res.json(`now you are logged in as ${req.session.email}`)
        })
      })

    }catch(err){
      next(err)
    }
  }

const logout = async (req, res, next) => {

  req.session.destroy((err) => {
    if (err) next(err)
  })
  res.json('you are now logged out')
}

module.exports = {
  register,
  login,
  logout,
}