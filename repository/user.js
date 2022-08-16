const db = require('../db/db')

const createUser = async (firstName, lastName, email) => {
      return await db('user').insert({
          first_name: firstName,
          last_name: lastName,
          email
        })
        .returning('*')
}


module.exports = {
  createUser
}