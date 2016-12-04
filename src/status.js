
let fs = require('fs')
let cson = require('cson')
let deepAssign = require('object-deep-assign')

let filepath

function setFilepath (path) {
  filepath = path
}

function getStatus () {
  try {
    return cson.parse(fs.readFileSync(filepath))
  } catch (e) {
    return {}
  }
}

function setStatus (status) {
  return fs.writeFileSync(filepath, cson.stringify(status, null, '  '))
}

function getIsUp (packageName) {
  let status = getStatus()
  return (
    status &&
    status.apps &&
    status.apps[packageName] &&
    status.apps[packageName].lastCheck &&
    status.apps[packageName].lastCheck.up
  )
}

function setIsUp (packageName, isUp = true) {
  let status = getStatus()
  deepAssign(status, {
    apps: {
      [packageName]: {
        lastCheck: {
          date: Date(),
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
