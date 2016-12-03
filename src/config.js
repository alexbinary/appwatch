
let fs = require('fs')
let cson = require('cson')
let minimist = require('minimist')

function get () {
  let args = minimist(process.argv.slice(2), {
    default: {'config': './conf.cson'},
    alias: {'config': ['c']}
  })
  let config = cson.parse(fs.readFileSync(args.config))
  return config
}

module.exports = {
  get
}
