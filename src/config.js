
let fs = require('fs')
let cson = require('cson')
let duration = require('duration-js')

function createHelper () {
  let instance = {
    getConfig (filepath) {
      let config = cson.parse(fs.readFileSync(filepath))
      config.checkInterval = duration.parse(config.checkInterval)
      return config
    }
  }
  return instance
}

module.exports = {
  createHelper
}
