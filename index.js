#!/usr/bin/env node

let fs = require('fs')
let cson = require('cson')
let http = require('https')
let growl = require('growl')
var email = require('emailjs')
let minimist = require('minimist')
let duration = require('duration-js')

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
  checkPlayStore(packageName, (err, isUp) => {
    if (!err) {
      if (isUp) {
        growl('🎉  ' + appName + ' is up on the PlayStore !')
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
    }
  })
}

let interval = setInterval(check, timeInterval.milliseconds())

check()

function checkPlayStore (packageName, cb) {
  let url = getPlayStoreUrl(packageName)
  http.request(url, (res) => {
    let isUp = getAndroidAppIsUp(res)
    cb(null, isUp)
  }).on('error', (err) => {
    console.error(err)
    cb(err)
  }).end()
}

function getPlayStoreUrl (packageName) {
  let url = 'https://play.google.com/store/apps/details?id=' + packageName
  return url
}

function getAndroidAppIsUp (httpResponse) {
  let isUp = httpResponse.statusCode === 200
  return isUp
}
