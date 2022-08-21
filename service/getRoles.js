const roleRepo = require('../repository/role')

const isRole = async (projectId, userId, role) => {
  const record = await roleRepo.getByProjectAndUser(projectId, userId)
  if (record.length === 0){
    console.log(`user ${userId} is NOT ${role} of project ${projectId}`)
    return false
  }
  if (record[0].role === role){
    console.log(`user ${userId} is ${role} of project ${projectId}`)
    return true
  }else if (role === 'member' && record[0].role === 'admin'){
    console.log(`user ${userId} is ${role} of project ${projectId}`)
    return true
  }

  console.log(`user ${userId} is NOT ${role} of project ${projectId}`)
  return false
}



module.exports = { isRole }