const genericRepo = require('./generic')
const db = require('../db/db')

const roleRepo = () => {


  let repo = genericRepo('role')

  repo.getByProjectIdAndUserId= async (projectId, userId) => {
    const records = await db
      .select('role')
      .from('role')
      .where('projectId', projectId)
      .where('userId', userId)

    return records
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
module.exports = roleRepo