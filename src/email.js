
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
    send: (appName, packageName, url, cb) => {
      mailServer.send({
        to: joinAddresses(config.to),
        from: config.from,
        subject: '🎉  ' + appName + ' is up on the PlayStore !',
        text: '🎉  ' + appName + ' is up on the PlayStore ! ' + url,
        attachment: [{
          data:
            `<html>
              <p>🎉  <b>${appName}</b> is up on the PlayStore !</p>
              <p><a href="${url}">${url}</a></p>
            </html>`,
          alternative: true
        }]
      }, cb)
    }
  }
}

module.exports = createAgent
