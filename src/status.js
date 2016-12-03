
let fs = require('fs')
let cson = require('cson')
let minimist = require('minimist')
let deepAssign = require('object-deep-assign')

function getFilePath () {
  let args = minimist(process.argv.slice(2), {
    default: {'status': './status.cson'},
    alias: {'status': ['s']}
  })
  return args.status
}

function getStatus () {
  let filepath = getFilePath()
  return cson.parse(fs.readFileSync(filepath)) || {}
}

function setStatus (status) {
  let filepath = getFilePath()
  return fs.writeFileSync(filepath, cson.stringify(status, null, '  '))
}

function getIsUp (packageName) {
  let status = getStatus()
  let lastCheckIsUp = false
  if (status && status.apps && status.apps[packageName] && status.apps[packageName].lastCheck) {
    if (status.apps[packageName].lastCheck.up) {
      lastCheckIsUp = true
    }
  }
  return lastCheckIsUp
}

function setIsUp (packageName, isUp = true) {
  let status = getStatus()
  deepAssign(status, {
    apps: {
      [packageName]: {
        lastCheck: {
          date: (new Date()) + '',
          up: isUp
        }
      }
    }
  })
  setStatus(status)
}

module.exports = {
  getIsUp,
  setIsUp
}
