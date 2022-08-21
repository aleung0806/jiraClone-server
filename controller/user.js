const genericController = require('./generic')
const userRepo  = require('../repository/user')
const bcrypt = require('bcrypt')


let userController = genericController(userRepo)

userController.create = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body
  try{
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const id = await userRepository.createUser( firstName, lastName, email, passwordHash)
    res.status(201).json(id)
  }catch(err){
    next(err)
  }
}



module.exports = userController