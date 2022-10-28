const bcrypt = require('bcrypt')
const userRepo = require('../repository/user')
const _ = require('lodash')
const saltRounds = 10


const register = async (firstName, lastName, email, password) => {
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = await userRepo.create( { firstName, lastName, email, passwordHash } )
  return _.pick(user, ['id', 'firstName', 'lastName', 'email'])
}

const login = async (email, password) => {
  const user = await userRepo.getByEmail(email)
  const match = await bcrypt.compare(password, user.passwordHash)  

  if (match) {
    return _.pick(user, ['id', 'firstName', 'lastName', 'email'])
  }else{
    throw new Error('credentials did not match')
  }
}



module.exports = { register, login }