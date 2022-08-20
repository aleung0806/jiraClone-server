const genericRepo = require('./generic')
const db = require('../db/db')

const issueRepo = genericRepo('issue')

module.exports = issueRepo