
let minimist = require('minimist')

function parseCliArgs (argv) {
  return minimist(argv, {
    alias: {
      'configpath': ['c'],
      'statuspath': ['s'],
      'logpath': ['l']
    }
  })
}

module.exports = {
  parseCliArgs
}
