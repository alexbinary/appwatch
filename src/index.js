#!/usr/bin/env node

let fs = require('fs')
let cson = require('cson')
let growl = require('growl')
let minimist = require('minimist')
let duration = require('duration-js')

var email = require('./email')
let playstore = require('./playstore')

let args = minimist(process.argv.slice(2), {
  default: {'config': './conf.cson'},
  alias: {'config': ['c']}
})

let config = cson.parse(fs.readFileSync(args.config))

let appName = config.appName
let packageName = config.packageName
let timeInterval = duration.parse(config.timeInterval)

let mailAgent = email({
  smtp: config.smtp,
  from: config.emailFrom,
  to: config.emailTo
})

function check () {
  console.log((new Date()) + ' 🔮  Checking if ' + appName + ' (' + packageName + ') is up on the PlayStore...')
  playstore.check(packageName, (err, isUp) => {
    if (!err) {
      if (isUp) {
        desktopNotification(appName, packageName)
        mailAgent.send(appName, packageName)
        clearInterval(interval)
      }
    }
  })
}

let interval = setInterval(check, timeInterval.milliseconds())

check()

function desktopNotification (appName, packageName) {
  growl('🎉  ' + appName + ' is up on the PlayStore !')
}
