const genericRepo = require('./generic')
const db = require('../db/db')

const roleRepo = () => {


  let repo = genericRepo('role')

  repo.getByUserAndProject = async (userId, projectId) => {
    console.log(userId)
    console.log(projectId)

    const records = await db
      .select('role')
      .from('role')
      .where('projectId', projectId)
      .where('userId', userId)
    
    if (records.length > 0){
      return records[0].role
    }else{
      throw new Error('permission denied')
    }
  }

  repo.getByUserId= async (userId) => {
    const records = await db
      .select('role')
      .from('role')
      .where('userId', userId)

    return records
  }
    
  return repo
}
module.exports = roleRepo()