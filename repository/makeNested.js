const makeNested = (mode, all) => {
  let projects = []

  let project = {
    id: all[0].projectId,
    title: all[0].projectTitle,
    lists: []
  }

  let list = {
    id: all[0].listId,
    listTitle: all[0].listTitle,
    issues: []
  }

  let issue = {}

  for (let i = 0; i < all.length; i++){
    let {
      projectId, 
      projectTitle, 
      listId, 
      listTitle, 
      creatorId,
      creatorFirst,
      creatorLast,
      creatorEmail,
      assigneeId,
      assigneeFirst,
      assigneeLast,
      assigneeEmail,
      ...issueContents
    } = all[i]

    if (mode === 'projects' || mode === 'project'){ //make new lists
      if (i !== 0 && all[i].listId !== all[i - 1].listId){
        project.lists.push({...list})
        list = {
          id: listId,
          listTitle,
          issues: []
        }
      }
    }
    if (mode === 'projects'){ //make new projects
      if (i !== 0 && all[i].projectId !== all[i - 1].projectId){
        projects.push(project)
        project = {
          id: projectId,
          projectTitle, 
          lists: []
        }
      }
    }
    issue = {
      ...issueContents,
      creator: {
        id: creatorId,
        firstName: creatorFirst,
        lastName: creatorLast,
        email: creatorEmail,
      },
      assignee: {
        id: assigneeId,
        firstName: assigneeFirst,
        lastName: assigneeLast,
        email: assigneeEmail,
      }, 

    }

    list.issues.push(issue)
    issue = {}
  }
  project.lists.push(list)
  projects.push(project)

  if (mode === 'projects'){
    return projects
  }
  if (mode === 'project'){
    return project
  }
  if (mode === 'list'){
    return list
  }
}

module.exports = {
  makeNested
}