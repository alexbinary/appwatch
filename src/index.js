#!/usr/bin/env node

let duration = require('duration-js')

var email = require('./email')
let config = require('./config')
let status = require('./status')
let playstore = require('./playstore')

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
      console.log((new Date()) + ' 🔮  Checking if ' + appName + ' (' + packageName + ') is up on the PlayStore...')
      playstore.check(packageName, (err, isUp) => {
        if (!err) {
          if (isUp) {
            status.setIsUp(packageName)
            mailAgent.send(appName, packageName)
          }
        }
      })
    }
  }
  setTimeout(check, timeInterval.milliseconds())
})()
