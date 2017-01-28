
function check (packageName, cb, {http = require('https')} = {}) {
  let url = getUrl(packageName)
  http.request(url, (res) => {
    let isUp = getAppIsUp(res)
    cb(null, isUp)
  }).on('error', (err) => {
    cb(err)
  }).end()
}

function getUrl (appId) {
  return 'https://itunes.apple.com/us/app/id' + appId
}

function getAppIsUp (httpResponse) {
  return !httpResponse.headers['x-apple-request-store-front']
}

module.exports = {
  check,
  getUrl
}
