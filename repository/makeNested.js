const makeNested = (mode, all) => {
  let projects = []

  let project = {
    projectId: all[0].projectId,
    title: all[0].projectTitle,
    lists: []
  }

  let list = {
    listId: all[0].listId,
    listTitle: all[0].listTitle,
    issues: []
  }

  for (let i = 0; i < all.length; i++){
    let {projectId, projectTitle, listId, listTitle, ...issue} = all[i]

    if (mode === 'projects' || mode === 'project'){ //make new lists
      if (i !== 0 && all[i].listId !== all[i - 1].listId){
        project.lists.push({...list})
        list = {
          listId,
          listTitle,
          issues: []
        }
      }
    }
    if (mode === 'projects'){ //make new projects
      if (i !== 0 && all[i].projectId !== all[i - 1].projectId){
        projects.push(project)
        project = {
          projectId,
          projectTitle, 
          lists: []
        }
      }
    }
    list.issues.push(issue)
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