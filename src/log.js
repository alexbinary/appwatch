
let bunyan = require('bunyan')
let minimist = require('minimist')

function createLogger () {
  let args = minimist(process.argv.slice(2), {
    default: {'log': './log.log'},
    alias: {'log': ['l']}
  })
  let logger = bunyan.createLogger({
    name: 'playstore-monitor',
    streams: [{
      path: args.log
    }]
  })
  return {
    check: function (packageName, appName) {
      logger.info(' 🔮  Checking if ' + appName + ' (' + packageName + ') is up on the PlayStore...')
    },
    isUp: function (packageName, appName, isUp = true) {
      if (isUp) {
        logger.info(' 🎉  ' + appName + ' (' + packageName + ') is up on the PlayStore!')
      } else {
        logger.info(' ☠️  ' + appName + ' (' + packageName + ') is not up on the PlayStore yet :(')
      }
    }
  }
}

module.exports = {
  createLogger
}
