const bcrypt = require('bcrypt')
const userRepo = require('../repository/user')
const saltRounds = 10

const register = async (firstName, lastName, email, password) => {
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = await userRepo.createUser( firstName, lastName, email, passwordHash)
  return user
}

const login = async (email, password) => {
  const user = await userRepo.getUser(email)
  const correct = await bcrypt.compare(password, user.passwordHash)  

  if (correct) {
    console.log(`${user} credentials matched`)
    return user
  }else{
    console.log(`${user} credentials did not match`)
  }
}



module.exports = { register, login }