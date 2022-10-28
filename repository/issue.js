const genericRepo = require('./generic')

const issueRepo = () => {

  return genericRepo('issue')

}

module.exports = issueRepo()