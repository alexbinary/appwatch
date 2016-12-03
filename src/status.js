
let fs = require('fs')
let cson = require('cson')
let deepAssign = require('object-deep-assign')

let filepath

function setFilepath (path) {
  filepath = path
}

function getStatus () {
  return cson.parse(fs.readFileSync(filepath)) || {}
}

function setStatus (status) {
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
  setFilepath,
  getIsUp,
  setIsUp
}
