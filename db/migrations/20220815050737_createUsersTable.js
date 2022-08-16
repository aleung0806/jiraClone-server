/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const { onUpdateProcedure, dropOnUpdateProcedure, onUpdateTrigger } = require('../triggers')



exports.up = function(knex) {
    return new Promise(async (resolve, reject) => {
      try {
        await knex.raw(onUpdateProcedure)
        await knex.schema
          .createTable('project', table => {
            table.increments('id').primary()
            table.string('title').notNullable()
            table.timestamps(true, true)
          })
        await knex.raw(onUpdateTrigger('project'))
        console.log('project added successfully')

        await knex.schema
        .createTable('user', table => {
          table.increments('id').primary()
          table.string('email').notNullable().unique()
          table.string('first_name').notNullable()
          table.string('last_name')
          table.timestamps(true, true)
        })
        //await knex.raw(onUpdateTrigger('user'))
        console.log('user added successfully')

        await knex.schema
        .createTable('list', table => {
          table.increments('id').primary()
          table.string('title').notNullable()
          table.integer('projectId').notNullable()
          table.foreign('projectId').references('project.id')
          table.timestamps(true, true)
        })
        await knex.raw(onUpdateTrigger('list'))
        console.log('list added successfully')

        await knex.schema
        .createTable('issue', table => {
          table.increments('id').primary()
          table.string('title').notNullable()
          table.integer('index').notNullable()
          table.integer('listId').notNullable()
          table.foreign('listId').references('list.id')
          table.integer('projectId').notNullable()
          table.foreign('projectId').references('project.id')
          table.string('description')
          table.string('type')
          table.string('status')
          table.string('priority')
          table.date('date_due')
          table.integer('assigneeId')
          table.foreign('assigneeId').references('user.id')
          table.integer('creatorId')
          table.foreign('creatorId').references('user.id')
          table.timestamps(true, true)
        })
        await knex.raw(onUpdateTrigger('issue'))
        console.log('issue added successfully')
        resolve()
        
      } catch(err){
        return reject(err)
      }
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return new Promise(async (resolve, reject) => {
    try {
      await knex.schema.dropTable('issue')
      await knex.schema.dropTable('list')
      await knex.schema.dropTable('project')
      await knex.schema.dropTable('user')
      await knex.raw(dropOnUpdateProcedure)
      resolve()
      
    } catch(err){
      return reject(err)
    }
  })

};
