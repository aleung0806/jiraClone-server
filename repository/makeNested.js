const projectGet = (arr) => {

  const first = arr[0]
  let project = {
    id: first.projectId,
    title: first.projectTitle,
    lists: []
  }

  if (first.listId === null){
    return project
  }

  let list = {
    id: first.listId,
    listTitle: first.listTitle,
    issues: []
  }

  let issue = {}

  for (let i = 0; i < arr.length; i++){
    let {
      listId, 
      listTitle, 
      issueId,
      issueTitle,
      creatorId,
      creatorEmail,
      assigneeId,
      assigneeEmail,
    } = arr[i]

    if (i !== 0 && arr[i].listId !== arr[i - 1].listId){
      project.lists.push({...list})
      list = {
        id: listId,
        listTitle,
        issues: []
      }
    }
    
    issue = {
      id: issueId,
      title: issueTitle,
      creator: {
        id: creatorId,
        email: creatorEmail
      },
      assignee: {
        id: assigneeId,
        email: assigneeEmail
      }
    }

    if (issue.id === null){
      break
    }

    list.issues.push(issue)
    issue = {}
  }

  project.lists.push(list)
  return project
}


module.exports = {
  projectGet
}