
let minimist = require('minimist')

/**
 * @param argv = process.argv.slice(2)
 */
function handle (argv) {
  let args = minimist(argv, {
    default: {
      'configpath': './config.cson',
      'statuspath': './status.cson',
      'logpath': './log.log'
    },
    alias: {
      'configpath': ['c'],
      'statuspath': ['s'],
      'logpath': ['l']
    }
  })
  return args
}

module.exports = {
  handle
}
