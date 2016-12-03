#!/usr/bin/env node

let fs = require('fs')
let cson = require('cson')
let http = require('https')
let growl = require('growl')
var email = require('emailjs')
let minimist = require('minimist')
let duration = require('duration-js')

let args = minimist(process.argv.slice(2), {
  alias: {
    'appName': ['name', 'n'],
    'appId': ['id'],
    'androidPackageName': ['packageName', 'p'],
    'timeInterval': ['t', 'time', 'interval', 'sleep']
  },
  default: {
    'appName': null,
    'appId': null,
    'androidPackageName': null,
    'timeInterval': null
  }
})

let config = cson.parse(fs.readFileSync('./conf.cson'))

config.appName = args.appName || config.appName
config.packageName = args.packageName || args.appId || config.packageName
config.timeInterval = duration.parse(args.timeInterval || config.timeInterval)

let appName = config.appName
let packageName = config.packageName
let timeInterval = config.timeInterval

let url = 'https://play.google.com/store/apps/details?id=' + packageName

let mailServer = email.server.connect(config.smtp)

function check () {
  console.log((new Date()) + ' 🔭  Checking if ' + appName + ' (' + packageName + ') is up on the PlayStore...')
  http.request(url, (res) => {
    if (res.statusCode === 200) {
      growl('🎉  ' + appName + ' is up on the PlayStore !', {open: url})
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
      clearInterval(interval)
    }
  }).on('error', (e) => {
    console.log(`problem with request: ${e.message}`)
  }).end()
}

let interval = setInterval(check, timeInterval.milliseconds())

check()
