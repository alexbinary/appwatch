
var email = require('emailjs')

function getStoreName (isApple) {
  return isApple ? 'AppStore' : 'PlayStore'
}

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
    send: (appName, appId, url, isApple, cb) => {
      mailServer.send({
        to: joinAddresses(config.to),
        from: config.from,
        subject: '🎉  ' + appName + ' is up on the ' + getStoreName(isApple) + ' !',
        text: '🎉  ' + appName + ' is up on the ' + getStoreName(isApple) + ' ! ' + url,
        attachment: [{
          data:
            `<html>
              <p>🎉  <b>${appName}</b> is up on the ${getStoreName(isApple)} !</p>
              <p><a href="${url}">${url}</a></p>
            </html>`,
          alternative: true
        }]
      }, cb)
    }
  }
}

module.exports = createAgent
