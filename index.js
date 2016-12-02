#!/usr/bin/env node

let http = require('https')
let growl = require('growl')
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
    'timeInterval': '15m'
  }
})

let appName = args.appName
let packageName = args.packageName || args.appId
let timeInterval = duration.parse(args.timeInterval)

let url = 'https://play.google.com/store/apps/details?id=' + packageName

function check () {
  console.log((new Date()) + ' 🔭  Checking if ' + appName + ' (' + packageName + ') is up on the PlayStore...')
  http.request(url, (res) => {
    if (res.statusCode === 200) {
      growl('🎉  ' + appName + ' is up on the PlayStore !', {open: url})
      clearInterval(interval)
    }
  }).on('error', (e) => {
    console.log(`problem with request: ${e.message}`)
  }).end()
}

let interval = setInterval(check, timeInterval.milliseconds())

check()
