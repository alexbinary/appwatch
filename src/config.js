
let fs = require('fs')
let cson = require('cson')
let minimist = require('minimist')
let deepAssign = require('object-deep-assign')

let configDefault = {
  timeInterval: '1h',
  emailFrom: 'PlayStore Monitor',
  smtp: {
    ssl: true
  }
}

function get () {
  let args = minimist(process.argv.slice(2), {
    default: {'config': './conf.cson'},
    alias: {'config': ['c']}
  })
  let config = cson.parse(fs.readFileSync(args.config))
  config = deepAssign(configDefault, config)
  return config
}

module.exports = {
  get
}
