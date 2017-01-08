
let fs = require('fs')
let cson = require('cson')
let duration = require('duration-js')
let deepAssign = require('object-deep-assign')

let filepath

function use (path) {
  filepath = path
}

let configDefault = {
  checkInterval: '1h',
  email: {
    from: 'AppStore Monitor'
  },
  smtp: {
    ssl: true
  }
}

function getConfig () {
  let config = cson.parse(fs.readFileSync(filepath))
  config = deepAssign({}, configDefault, config)
  config.checkInterval = duration.parse(config.checkInterval)
  return config
}

module.exports = {
  use,
  getConfig
}
