const db = require('../db/db')
const config = require('../generic.config')


const genericRepo = (elementName) => {  

  const create = async (element) => {
    console.log(`${elementName} repo create ${element}`)

    const newElement = await db(elementName)
      .insert(element)
      .returning('*')

    return newElement[0]
  }

  const get = async (id) => {
    console.log(`${elementName} repo get ${id}`)

    const records = await db
      .select('*')
      .from(elementName)
      .where('id', id)

      if (records.length !== 0){
        return records[0]
      }else{
        throw new Error('not found')
      }
  }

  const getAllByProjectId = async (projectId) => {
    console.log(`${elementName} repo getAllByProjectId ${projectId}`)

    const records = await db  
      .select('*')
      .from(elementName)
      .where('projectId', projectId)
  
    if (records.length !== 0){
      return records
    }else{
      throw new Error('not found')
    }
  }




  const update = async (element) => {
    console.log(`${elementName} repo update ${element}`)
    const id = element.id
    const updatedElement = await db(elementName)
      .where('id', id)
      .update(element)
      .returning('*')

    return updatedElement[0]
  }

  const remove = async (element) => {
    const id = element.id
    console.log(`${elementName} repo remove ${id}`)

    await db(elementName)
      .where('id', id)
      .del()

    return
  }

  if (config.create){

  }

  return {
    ...(create in config ? {create} : {}),
    ...(get in config ? {get} : {}),
    ...(getAllByProjectId in config ? {getAllByProjectId} : {}),
    ...(update in config ? {update} : {}),
    ...(remove in config ? {remove} : {})
  }
}
module.exports = genericRepo