
var mailer = require('./mailer')
var appMailer = require('./appMailer')

function create (config) {
  return appMailer.createmailer({
    mailer: mailer.create(config.smtp),
    config
  })
}

module.exports = {
  create
}
