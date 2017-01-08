
let appLogger = require('./appLogger')
let hybridLogger = require('./hybridLogger')

function createLogger ({filepath}) {
  let logger = appLogger.create({
    logger: hybridLogger.create({
      name: 'appstore-monitor',
      filepath
    })
  })
  return logger
}

module.exports = {
  createLogger
}
