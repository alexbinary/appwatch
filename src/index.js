#!/usr/bin/env node

let log = require('./log')
let mail = require('./mail')
let conf = require('./conf')
let input = require('./input')
let status = require('./status')
let appstore = require('./appstore')
let playstore = require('./playstore')
let scheduler = require('./scheduler')

let args = input.parseCliArgs(process.argv.slice(2))
let logger = log.createLogger({filepath: args.logpath})

let config = {}
let apps = {}
let mailer = null

function loadConfig () {
  config = conf.getConfig(args.configpath)
}

function loadApps () {
  apps = config.apps
}

function initMailer () {
  mailer = mail.createMailer({
    smtp: config.smtp,
    from: config.email.from,
    to: config.email.to
  })
}

function getAppName (appId) {
  return apps[appId].name
}

function getIsApple (appId) {
  return !Number.isNaN(Number(appId))
}

function getStore (isApple) {
  return isApple ? appstore : playstore
}

function getStoreForApp (appId) {
  let isApple = getIsApple(appId)
  let store = getStore(isApple)
  return store
}

function getAppIsUp (appId) {
  return status.getIsUp(args.statuspath, appId)
}

function setAppIsUp (appId, isUp) {
  return status.setIsUp(args.statuspath, appId, isUp)
}

function processApps () {
  for (let appId in apps) {
    processApp(appId)
  }
}

function processApp (appId) {
  if (!getAppIsUp(appId)) {
    checkApp(appId)
  }
}

function checkApp (appId) {
  let appName = getAppName(appId)
  let isApple = getIsApple(appId)
  let store = getStore(isApple)
  logger.check(appId, appName, isApple)
  store.check(appId, (err, isUp) => {
    onAppCheckResult(err, isUp, appId)
  })
}

function onAppCheckResult (err, isUp, appId) {
  let appName = getAppName(appId)
  let isApple = getIsApple(appId)
  let up = !err && isUp
  logger.isUp(appId, appName, isApple, up)
  if (up) {
    sendMailAppIsUp(appId)
  }
  setAppIsUp(appId, isUp)
}

function sendMailAppIsUp (appId) {
  initMailer()
  let appName = getAppName(appId)
  let isApple = getIsApple(appId)
  let store = getStoreForApp(appId)
  let url = store.getUrl(appId)
  mailer.sendMail(appName, appId, url, isApple, (err, msg) => {
    if (err) {
      console.log(err)
      logger.mailError(err)
    }
  })
}

function registerNextCheck () {
  let nextCheck = scheduler.getNextCheck({config})
  setTimeout(run, nextCheck.timeout)
  logger.nextCheck(nextCheck.date)
}

function run () {
  loadConfig()
  loadApps()
  processApps()
  registerNextCheck()
}

run()
