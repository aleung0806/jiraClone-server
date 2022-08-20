const db = require('../db/db')

const createUser = async (firstName, lastName, email, passwordHash) => {
      return await db('user').insert({
          first_name: firstName,
          last_name: lastName,
          password_hash: passwordHash,
          email
        })
        .returning('*')
}

const getUser = async (email) => {
  console.log('repo getting user', email)
  try {
    const rows = await db('user')
    .select('*')
    .where('email', email)
    .returning('*')
    console.log('user found in db', rows[0])
    return rows[0]
  }
  catch(err){
    console.log('user not found in db', rows[0])

    console.log(err)
  }

}

module.exports = {
  createUser,
  getUser
}