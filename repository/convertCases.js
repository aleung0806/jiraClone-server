const _ = require('lodash')

const toCamel = (element) => {
  return _.mapKeys(element, (value, key) => _.camelCase(key))
}

const toSnake = (element) => {
  return _.mapKeys(element, (value, key) => _.snakeCase(key))
}

module.exports = {
  toCamel,
  toSnake
}