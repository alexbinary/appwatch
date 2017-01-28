
let fs = require('fs')
let cson = require('cson')
let duration = require('duration-js')

function getConfig (filepath) {
  let config = cson.parse(fs.readFileSync(filepath))
  config.checkInterval = duration.parse(config.checkInterval)
  return config
}

module.exports = {
  getConfig
}
