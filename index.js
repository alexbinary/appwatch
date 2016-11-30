let http = require('https')
let growl = require('growl')

let packageName = process.argv[2]
let url = 'https://play.google.com/store/apps/details?id=' + packageName

function check () {
  console.log((new Date()) + ' 🔭  Checking if ' + packageName + ' is up on the PlayStore...')
  http.request(url, (res) => {
    if (res.statusCode === 200) {
      growl('🎉  ' + packageName + ' is up on the PlayStore !', {open: url})
      clearInterval(interval)
    }
  }).on('error', (e) => {
    console.log(`problem with request: ${e.message}`)
  }).end()
}

let interval = setInterval(check, 30 * 1000)

check()
