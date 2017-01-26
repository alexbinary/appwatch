
var mailer = require('./mailer')
var appMailer = require('./appMailer')

function create (config) {
  return appMailer.create({
    mailer: mailer.create(config.smtp),
    config
  })
}

module.exports = {
  create
}
