
let appLogger = require('./appLogger')
let hybridLogger = require('./hybridLogger')

function createLogger ({filepath}) {
  let logger = appLogger.create({
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
