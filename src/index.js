#!/usr/bin/env node

let log = require('./log')
let mail = require('./mail')
let input = require('./input')
let conf = require('./conf')
let status = require('./status')
let appstore = require('./appstore')
let playstore = require('./playstore')
let scheduler = require('./scheduler')

let inputHelper = input.createHelper()
let inputs = inputHelper.process(process.argv.slice(2))
let logger = log.createLogger({filepath: inputs.logpath})

status.use(inputs.statuspath)

;(function run () {
  let config = conf.getConfig(inputs.configpath)
  let mailer = mail.createMailer({
    smtp: config.smtp,
    from: config.email.from,
    to: config.email.to
  })
  let apps = config.apps
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
  let nextCheck = scheduler.getNextCheck(config)
  setTimeout(run, nextCheck.timeout)
  logger.nextCheck(nextCheck.date)
})()
