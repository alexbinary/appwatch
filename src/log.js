
let applog = require('./applog')
let hybridLogger = require('./hybridLogger')

function createLogger ({filepath}) {
  let logger = applog.logger({
    logger: hybridLogger.create({
      name: 'appwatch',
      filepath
    })
  })
  return logger
}

module.exports = {
  createLogger
}
