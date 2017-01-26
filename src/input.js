
let minimist = require('minimist')

function createHelper () {
  let instance = {
    process (argv) {
      let args = minimist(argv, {
        alias: {
          'configpath': ['c'],
          'statuspath': ['s'],
          'logpath': ['l']
        }
      })
      return args
    }
  }
  return instance
}

module.exports = {
  createHelper
}
