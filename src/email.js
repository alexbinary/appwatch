
var email = require('emailjs')

function joinAddresses (addresses) {
  let joined = ''
  for (let i in addresses) {
    if (joined) joined += ', '
    joined += addresses[i]
  }
  return joined
}

function createAgent (config) {
  let mailServer = email.server.connect(config.smtp)
  return {
    send: function (appName, packageName) {
      mailServer.send({
        to: joinAddresses(config.to),
        from: config.from,
        subject: '🎉  ' + appName + ' is up on the PlayStore !',
        text: '🎉  ' + appName + ' is up on the PlayStore !'
      }, (err, message) => {
        if (err) {
          console.log(err)
        }
      })
    }
  }
}

module.exports = createAgent
