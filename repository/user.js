const genericRepo = require('./generic')
const db = require('../db/db')

const repo = () => {

  let repo = genericRepo('user')

  repo.getByEmail = async (email) => {
      console.log(`user repo getByEmail ${email}`)
  
      const records = await db
        .select('*')
        .from('user')
        .where('email', email)
  
        if (records.length > 0){
          return records[0]
        }else{
          throw new Error('not found')
        }
  }

  return repo

}

module.exports = repo()