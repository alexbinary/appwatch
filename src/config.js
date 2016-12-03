
let fs = require('fs')
let cson = require('cson')
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
  return config
}

module.exports = {
  setFilepath,
  get
}
