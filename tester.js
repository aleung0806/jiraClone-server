const { genericRepo } = require('./repository/generic')
const { createList } = require('./repository/list')

let listRepo = genericRepo('list')
const l = {title: 'A new age of lists', projectId: '2'}
let main = (async () => {
  let list = await listRepo.update(12, {title: 'A new age altogether'})
  //let list = await createList(l)
  console.log(list)
})()
