#!/usr/bin/env node

let fs = require('fs')
let cson = require('cson')
let growl = require('growl')
var email = require('emailjs')
let minimist = require('minimist')
let duration = require('duration-js')

let playstore = require('./playstore')

let args = minimist(process.argv.slice(2), {
  default: {'config': './conf.cson'},
  alias: {'config': ['c']}
})

let config = cson.parse(fs.readFileSync(args.config))

let appName = config.appName
let packageName = config.packageName
let timeInterval = duration.parse(config.timeInterval)

let mailServer = email.server.connect(config.smtp)

function check () {
  console.log((new Date()) + ' 🔮  Checking if ' + appName + ' (' + packageName + ') is up on the PlayStore...')
  playstore.check(packageName, (err, isUp) => {
    if (!err) {
      if (isUp) {
        desktopNotification(appName, packageName)
        sendEmail(appName, packageName)
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

function sendEmail (appName, packageName) {
  mailServer.send({
    to: config.emailTo,
    from: config.emailFrom,
    subject: '🎉  ' + appName + ' is up on the PlayStore !',
    text: '🎉  ' + appName + ' is up on the PlayStore !'
  }, (err, message) => {
    if (err) {
      console.log(err)
    }
  })
}
