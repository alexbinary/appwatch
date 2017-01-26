
let fs = require('fs')
let cson = require('cson')
let duration = require('duration-js')
let deepAssign = require('@alexbinary/object-deep-assign')

let defaultConfig = {
  checkInterval: '1h',
  email: {
    from: 'AppWatch'
  },
  smtp: {
    ssl: true
  }
}

let filepath

function use (configFilePath) {
  filepath = configFilePath
}

function getConfig () {
  let configFileConfig = getConfigFileConfig(filepath)
  let config = mergeRawConfigs(defaultConfig, configFileConfig)
  config = processRawConfig(config)
  return config
}

function getConfigFileConfig (filepath) {
  try {
    return cson.parse(fs.readFileSync(filepath))
  } catch (e) {
    return {}
  }
}

function mergeRawConfigs (...configs) {
  return deepAssign({}, ...configs)
}

function processRawConfig (config) {
  config.checkInterval = duration.parse(config.checkInterval)
  return config
}

module.exports = {
  use,
  getConfig
}
