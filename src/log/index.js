
let applog = require('./applog')
let hybridlog = require('./hybridlog')

function createLogger ({filepath}) {
  return applog.createLogger({
    logger: hybridlog.createLogger({
      name: 'appwatch',
      filepath
    })
  })
}

module.exports = {
  createLogger
}
