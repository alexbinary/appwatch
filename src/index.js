#!/usr/bin/env node

let log = require('./log')
let email = require('./email')
let input = require('./input')
let config = require('./config')
let status = require('./status')
let appstore = require('./appstore')
let playstore = require('./playstore')
let scheduler = require('./scheduler')

let inputs = input.handle(process.argv.slice(2))
let logger = log.createLogger({filepath: inputs.logpath})

let configHelper = config.createHelper()
status.use(inputs.statuspath)

;(function run () {
  let conf = configHelper.getConfig(inputs.configpath)
  let mailer = email.createMailer({
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
          mailer.sendMail(appName, appId, url, isApple, (err, msg) => {
            if (err) {
              logger.mailError(err)
            }
          })
        }
        status.setIsUp(appId, isUp)
      })
    }
  }
  let nextCheck = scheduler.getNextCheck(conf)
  setTimeout(run, nextCheck.timeout)
  logger.nextCheck(nextCheck.date)
})()
