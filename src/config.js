
let fs = require('fs')
let cson = require('cson')
let duration = require('duration-js')
let deepAssign = require('object-deep-assign')

let filepath

function setFilepath (path) {
  filepath = path
}

let configDefault = {
  checkInterval: '1h',
  email: {
    from: 'PlayStore Monitor'
  },
  smtp: {
    ssl: true
  }
}

function get () {
  let config = cson.parse(fs.readFileSync(filepath))
  config = deepAssign({}, configDefault, config)
  config.checkInterval = duration.parse(config.checkInterval)
  return config
}

module.exports = {
  setFilepath,
  get
}
