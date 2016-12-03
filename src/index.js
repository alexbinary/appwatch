#!/usr/bin/env node

let minimist = require('minimist')
let duration = require('duration-js')

var log = require('./log')
var email = require('./email')
let config = require('./config')
let status = require('./status')
let playstore = require('./playstore')

let args = minimist(process.argv.slice(2), {
  default: {
    'log': './log.log',
    'config': './conf.cson',
    'status': './status.cson'
  },
  alias: {
    'log': ['l'],
    'config': ['c'],
    'status': ['s']
  }
})

let logger = log.createLogger({filepath: args.log})
config.setFilepath(args.config)
status.setFilepath(args.status)

;(function check () {
  let conf = config.get()
  let timeInterval = duration.parse(conf.timeInterval)
  let mailAgent = email({
    smtp: conf.smtp,
    from: conf.emailFrom,
    to: conf.emailTo
  })
  let apps = conf.apps
  for (let packageName in apps) {
    let appName = apps[packageName].name
    if (!status.getIsUp(packageName)) {
      logger.check(packageName, appName)
      playstore.check(packageName, (err, isUp) => {
        let up = !err && isUp
        logger.isUp(packageName, appName, up)
        if (up) {
          let url = playstore.getUrl(packageName)
          mailAgent.send(appName, packageName, url)
        }
        status.setIsUp(packageName, isUp)
      })
    }
  }
  setTimeout(check, timeInterval.milliseconds())
})()
