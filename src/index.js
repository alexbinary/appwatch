#!/usr/bin/env node

let email = require('./email')
let input = require('./input')
let config = require('./config')
let status = require('./status')
let appstore = require('./appstore')
let playstore = require('./playstore')
let appLogger = require('./appLogger')
let hybridLogger = require('./hybridLogger')

let inputs = input.handle(process.argv.slice(2))

let logger = appLogger.create({
  logger: hybridLogger.create({
    name: 'appstore-monitor',
    filepath: inputs.logpath
  })
})

config.setFilepath(inputs.configpath)
status.setFilepath(inputs.statuspath)

;(function run () {
  let conf = config.get()
  let mailer = email({
    smtp: conf.smtp,
    from: conf.email.from,
    to: conf.email.to
  })
  let apps = conf.apps
  for (let appId in apps) {
    let isApple = !Number.isNaN(Number(appId))
    let store = isApple ? appstore : playstore
    let appName = apps[appId].name
    if (!status.getIsUp(appId)) {
      logger.check(appId, appName, isApple)
      store.check(appId, (err, isUp) => {
        let up = !err && isUp
        logger.isUp(appId, appName, isApple, up)
        if (up) {
          let url = store.getUrl(appId)
          mailer.send(appName, appId, url, isApple, (err, msg) => {
            if (err) {
              logger.mailError(err)
            }
          })
        }
        status.setIsUp(appId, isUp)
      })
    }
  }
  setTimeout(run, conf.checkInterval.milliseconds())
  let now = new Date()
  let date = new Date()
  date.setTime(now.getTime() + conf.checkInterval.milliseconds())
  logger.nextCheck(date)
})()
