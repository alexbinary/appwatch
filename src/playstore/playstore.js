
function check (packageName, cb, {http = require('https')} = {}) {
  let url = getUrl(packageName)
  http.request(url, (res) => {
    let isUp = getAppIsUp(res)
    cb(null, isUp)
  }).on('error', (err) => {
    cb(err)
  }).end()
}

function getUrl (packageName) {
  return 'https://play.google.com/store/apps/details?id=' + packageName
}

function getAppIsUp (httpResponse) {
  return httpResponse.statusCode === 200
}

module.exports = {
  check,
  getUrl
}
