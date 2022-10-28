const service = require('../service/auth')

const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body

  if (!firstName || !lastName || !email || !password ){
    return res.status(400).send('fields are missing')
  }

  try {
    const user = await service.register(firstName, lastName, email, password)
    res.status(201).json(user)
    
  } catch (err) {
    res.status(400).send('email already exists')
  }
    
}

const login = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password){
    return res.status(400).send('fields are missing')
  }

  if (req.session.email == email){
    return res.status(200).send(`${email} is already logged in`)
  }

  try {
    const user = await service.login(email, password)

    req.session.regenerate(err => next(err))
    req.session.email = user.email
    req.session.userId = user.id
    res.status(200).json(user)

  } catch (err) {
    res.status(400).send('incorrect email or password')
  }

}

const logout = async (req, res, next) => {

  req.session.destroy(err => next(err))
  res.send('you are now logged out')
}

module.exports = {
  register,
  login,
  logout,
}