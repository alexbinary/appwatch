
var appmail = require('./appmail')
var mail = require('./mail')

function createMailer (config) {
  return appmail.createMailer({
    mailer: mail.createMailer({config: config.smtp}),
    config
  })
}

module.exports = {
  createMailer
}
