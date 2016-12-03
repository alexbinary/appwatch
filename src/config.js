
let fs = require('fs')
let cson = require('cson')
let duration = require('duration-js')
let deepAssign = require('object-deep-assign')

let filepath

function setFilepath (path) {
  filepath = path
}

let configDefault = {
  timeInterval: '1h',
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
  config.timeInterval = duration.parse(config.timeInterval)
  return config
}

module.exports = {
  setFilepath,
  get
}
