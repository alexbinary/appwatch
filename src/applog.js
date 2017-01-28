
function getStoreName (isApple) {
  return isApple ? 'AppStore' : 'PlayStore'
}

function logger ({logger}) {
  return {
    check (appId, appName, isApple) {
      logger.info({appId, appName, isApple}, ' 🔮  Checking if ' + appName + ' (' + appId + ') is up on the ' + getStoreName(isApple) + '...')
    },
    isUp (appId, appName, isApple, isUp = true) {
      if (isUp) {
        logger.info({appId, appName, isApple, isUp}, ' 🎉  ' + appName + ' (' + appId + ') is up on the ' + getStoreName(isApple) + '!')
      } else {
        logger.info({appId, appName, isApple, isUp}, ' ☠️  ' + appName + ' (' + appId + ') is not up on the ' + getStoreName(isApple) + ' yet :(')
      }
    },
    mailError (err) {
      logger.error(err)
    },
    nextCheck (date) {
      logger.info(' 🕓  next check at ' + date)
    }
  }
}

module.exports = {
  logger
}
