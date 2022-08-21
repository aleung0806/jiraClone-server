const repo = require('../repository/role')

const create = async (req, res, next) => {
  const role = req.body
  const { userId, email }= req.session
  console.log(`role create '${role.title}' by '${email} (${userId})'`)

  try{
    const createdIssue = await repo.create(role, userId)
    res.status(200).json(createdIssue)
  }catch(err){
    next(err)
  }
}




module.exports = {
  create
}