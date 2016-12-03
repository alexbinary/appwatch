#!/usr/bin/env node

let duration = require('duration-js')

var log = require('./log')
var email = require('./email')
let config = require('./config')
let status = require('./status')
let playstore = require('./playstore')

let logger = log.createLogger()

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
          mailAgent.send(appName, packageName)
        }
        status.setIsUp(packageName, isUp)
      })
    }
  }
  setTimeout(check, timeInterval.milliseconds())
})()
