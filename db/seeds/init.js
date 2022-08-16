const data = require('../data')


exports.seed = function(knex) {
  
  const users = [
    {
      firstName: 'Albert',
      lastName: 'Leung',
      email: 'albert@leung.com'
    },
    {
      firstName: 'Shelby',
      lastName: 'Tinaza',
      email: 'shelby@tinaza.com'
    },
    {
      firstName: 'Grinchie',
      lastName: 'Tinaza',
      email: 'grinchie@tinaza.com'
    }
  ]

  const projects = [
    {
      title: 'things to do this summer'
    },
    {
      title: 'coding'
    }
  ]
  const lists = [
    {
      title: 'today',
      projectId: 1
    },
    {
      title: 'this week',
      projectId: 1
    },
    {
      title: 'eventually',
      projectId: 1
    },
    {
      title: 'very important',
      projectId: 2
    },
    {
      title: 'to do',
      projectId: 2
    },
    {
      title: 'finished',
      projectId: 2
    }
  ]
  const issues = [
    'go to the beach',
    'do dishes',
    'make fruit salad',
    'have a garage sale',
    'study for coding interview',
    'give cats flea medicine',
    'take out garbage',
    'go to the park',
    'bike to Safeway',
    'make goulash',
    'drive to the ocean', 
    'make ice cream',
    'eat ice cream',
    'make popsicles',
    'go to wild waves',
    'visit great wolf lodge',
    'listen to summer tunes',
    'go to concert',
    'get a new dog',
    'drive around the block',
    'get through leetcode',
    'code up the API',
    'whip up frontend',
    'fill out portfolio'
  ]

  let userIds = []
  let projectIds = []
  let listIds = []
  let issueIds = []

  const makeUsers = () => {
    return users.map(user => {
      return {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email
      }
    })
  }

  const makeLists = () => {
    return lists.map(list => {
      return {
        title: list.title,
        projectId: projectIds[list.projectId - 1]
      }
    })
  }

  const makeIssues = () => {
    let issuesObj = []
    let projectIdIndex = 0
    for (let i = 0; i < issues.length; i++){
      j = i % 6
      if (j > 2){
        projectIdIndex = 1
      }else {
        projectIdIndex = 0

      }
      issuesObj.push({
        title: issues[i],
        type: data.randomElement(data.types),
        priority: data.randomElement(data.priorities),
        assigneeId: data.randomElement(userIds),
        creatorId: data.randomElement(userIds),
        listId: listIds[j],
        projectId: projectIds[projectIdIndex],
        index: Math.floor(i / 6)
      })
      
    }

    return issuesObj

  }

  return new Promise(async (resolve, reject) => {
    try {
      await knex('issue').del()
      await knex('list').del()
      await knex('project').del()
      await knex('user').del()


      await knex('user').insert(makeUsers())
      const u = await knex('user').select('userId')
      userIds = u.map(user => user.userId)
      console.log('users added successfully', userIds)

      await knex('project').insert(projects)
      const p = await knex('project').select('projectId')
      projectIds = p.map(project => project.projectId)

      console.log('projects added successfully', projectIds)

      await knex('list').insert(makeLists())
      const l = await knex('list').select('listId')
      listIds = l.map(list => list.listId)

      console.log('lists added successfully', listIds)

      await knex('issue').insert(makeIssues())
      const i = await knex('issue').select('issueId')
      issueIds = i.map(issue => issue.issueId)
      console.log('issues added successfully', issueIds)
      
      resolve()
      
    } catch(err){
      return reject(err)
    }
  })

};