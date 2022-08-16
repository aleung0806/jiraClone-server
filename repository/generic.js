const db = require('../db/db')

const genericRepo = (elementName) => {  
  const getAll = async () => {
    let elements = await db
      .select('*')
      .from(elementName)

    return elements
  }

  const get = async (id) => {
    let element = await db
      .select('*')
      .from(elementName)
      .where('id', id)

    return element
  }

  const create = async (element) => {
    let newElement = await db(elementName)
      .insert(element)
      .returning('*')

    return newElement
  }
  const update = async (id, element) => {
    let updatedElement = await db(elementName)
      .where('id', id)
      .update(element)
      .returning('*')

    return updatedElement
  }

  const remove = async (id) => {
    console.log('repo', elementName)
    await db(elementName)
      .where('id', id)
      .del()

    return 
  }

  return {
    getAll, get, create, update, remove
  }
}
module.exports = genericRepo