
let http = require('https')

function check (packageName, cb) {
  let url = getUrl(packageName)
  http.request(url, (res) => {
    let isUp = getAppIsUp(res)
    cb(null, isUp)
  }).on('error', (err) => {
    console.error(err)
    cb(err)
  }).end()
}

function getUrl (packageName) {
  let url = 'https://play.google.com/store/apps/details?id=' + packageName
  return url
}

function getAppIsUp (httpResponse) {
  let isUp = httpResponse.statusCode === 200
  return isUp
}

module.exports = {
  check,
  getUrl
}
