const roleRepo = require('../repository/role')
const listRepo = require('../repository/list')
const issueRepo = require('../repository/issue')


const findProjectId = async (id, type) => {

  let repo = listRepo
  if (type === 'project'){
    return id
  } else if (type === 'list'){
    repo = listRepo
  } else if (type === 'issue'){
    repo = issueRepo
  } else if (type === 'role'){
    repo = roleRepo
  }

  try {
    const record = await repo.get(id)
    return record.projectId

  } catch (err){
    return new Error('permission denied')

  }
}

const isMember = async (userId, id, type) => {

  const projectId = await findProjectId(id, type)

  console.log(`checking member permissions of userId ${userId} projectId ${projectId}`)
  try {
    await roleRepo.getByUserAndProject(userId, projectId)
    return true
  }catch (err) {
    return false
  }
}

const isAdmin = async (userId, id, type) => {

  const projectId = await findProjectId(id, type)

  console.log(`checking admin permissions of userId ${userId} projectId ${projectId}`)

  try {
    const role = await roleRepo.getByUserAndProject(userId, projectId)
    console.log('role', role)
    return role == 'admin'
  }catch (err) {
    return false
  }

}

module.exports = {
  isMember,
  isAdmin
}