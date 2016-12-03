
let bunyan = require('bunyan')

function createLogger ({filepath}) {
  let logger = bunyan.createLogger({
    name: 'playstore-monitor',
    streams: [{
      type: 'raw',
      stream: { write: (data) => console.log(data.time + ' ' + data.msg) }
    }, {
      path: filepath
    }]
  })
  return {
    check: (packageName, appName) => {
      logger.info({packageName, appName}, ' 🔮  Checking if ' + appName + ' (' + packageName + ') is up on the PlayStore...')
    },
    isUp: (packageName, appName, isUp = true) => {
      if (isUp) {
        logger.info({packageName, appName, isUp}, ' 🎉  ' + appName + ' (' + packageName + ') is up on the PlayStore!')
      } else {
        logger.info({packageName, appName, isUp}, ' ☠️  ' + appName + ' (' + packageName + ') is not up on the PlayStore yet :(')
      }
    },
    mailError: (err) => {
      logger.error(err)
    }
  }
}

module.exports = {
  createLogger
}
