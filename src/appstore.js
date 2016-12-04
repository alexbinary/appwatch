
let http = require('https')

function check (packageName, cb) {
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
