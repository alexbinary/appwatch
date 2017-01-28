
function createMailer ({config, emailjs = require('emailjs')}) {
  return emailjs.server.connect(config)
}

module.exports = {
  createMailer
}
