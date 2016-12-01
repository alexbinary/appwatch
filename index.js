#!/usr/bin/env node

let http = require('https')
let growl = require('growl')
let minimist = require('minimist')

let args = minimist(process.argv.slice(2), {
  alias: {
    'appId': ['id'],
    'androidPackageName': ['packageName', 'p']
  },
  default: {
    'appId': null,
    'androidPackageName': null
  }
})

let packageName = args.packageName || args.appId
let url = 'https://play.google.com/store/apps/details?id=' + packageName

function check () {
  console.log((new Date()) + ' 🔭  Checking if ' + packageName + ' is up on the PlayStore...')
  http.request(url, (res) => {
    if (res.statusCode === 200) {
      growl('🎉  ' + packageName + ' is up on the PlayStore !', {open: url})
      clearInterval(interval)
    }
  }).on('error', (e) => {
    console.log(`problem with request: ${e.message}`)
  }).end()
}

let interval = setInterval(check, 30 * 1000)

check()
