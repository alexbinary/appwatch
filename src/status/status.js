
let fs = require('fs')
let cson = require('cson')

let deepAssign = require('@alexbinary/object-deep-assign')

function getStatus (filepath) {
  try {
    return cson.parse(fs.readFileSync(filepath))
  } catch (e) {
    return {}
  }
}

function setStatus (filepath, status) {
  return fs.writeFileSync(filepath, cson.stringify(status, null, '  '))
}

function getIsUp (filepath, packageName) {
  let status = getStatus(filepath)
  return (
    status &&
    status.apps &&
    status.apps[packageName] &&
    status.apps[packageName].lastCheck &&
    status.apps[packageName].lastCheck.up
  )
}

function setIsUp (filepath, packageName, isUp = true) {
  let status = getStatus(filepath)
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
  setStatus(filepath, status)
}

module.exports = {
  getIsUp,
  setIsUp
}
