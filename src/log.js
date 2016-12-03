
let bunyan = require('bunyan')

function getStoreName (isApple) {
  return isApple ? 'AppStore' : 'PlayStore'
}

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
    check: (appId, appName, isApple) => {
      logger.info({appId, appName, isApple}, ' 🔮  Checking if ' + appName + ' (' + appId + ') is up on the ' + getStoreName(isApple) + '...')
    },
    isUp: (appId, appName, isApple, isUp = true) => {
      if (isUp) {
        logger.info({appId, appName, isApple, isUp}, ' 🎉  ' + appName + ' (' + appId + ') is up on the ' + getStoreName(isApple) + '!')
      } else {
        logger.info({appId, appName, isApple, isUp}, ' ☠️  ' + appName + ' (' + appId + ') is not up on the ' + getStoreName(isApple) + ' yet :(')
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
