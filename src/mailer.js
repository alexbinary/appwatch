
var email = require('emailjs')

function create (config) {
  return email.server.connect(config)
}

module.exports = {
  create
}
