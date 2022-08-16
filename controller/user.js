const userRepository  = require('../repository/user')


const createUser = async (req, res, next) => {
  const { firstName, lastName, email } = req.body
  try{
    const id = await userRepository.createUser( firstName, lastName, email )
    res.status(201).json(id)
  }catch(err){
    next(err)
  }
}



module.exports = {
  createUser
}