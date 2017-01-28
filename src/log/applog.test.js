
let chai = require('chai')
let sinon = require('sinon')
let expect = chai.expect
chai.use(require('sinon-chai'))

let applog = require('./applog')

let baseLogger = {
  info: sinon.spy(),
  error: sinon.spy()
}

describe('applog', function () {
  it('produces log output for a check operation', function () {
    // ## Setup
    let logger = applog.createLogger({logger: baseLogger})
    // ## TEST
    let appId = 1
    let appName = 'TEST'
    let isApple = true
    logger.check(appId, appName, isApple)
    // ## Assert
    expect(baseLogger.info).to.be.calledWithExactly(
      {
        'appId': 1,
        'appName': 'TEST',
        'isApple': true
      },
      ' 🔮  Checking if TEST (1) is up on the AppStore...'
    )
    // ## End
  })
  it('produces log output for a check result', function () {
    // ## Setup
    let logger = applog.createLogger({logger: baseLogger})
    // ## TEST
    let appId = 1
    let appName = 'TEST'
    let isApple = true
    let up = true
    logger.isUp(appId, appName, isApple, up)
    // ## Assert
    expect(baseLogger.info).to.be.calledWithExactly(
      {
        'appId': 1,
        'appName': 'TEST',
        'isApple': true,
        'isUp': true
      },
      ' 🎉  TEST (1) is up on the AppStore!'
    )
    // ## End
  })
  it('produces log output for a mail error', function () {
    // ## Setup
    let logger = applog.createLogger({logger: baseLogger})
    // ## TEST
    let err = new Error('test error')
    logger.mailError(err)
    // ## Assert
    expect(baseLogger.error).to.be.calledWithExactly(
      err
    )
    // ## End
  })
  it('produces log output for the next check', function () {
    // ## Setup
    let logger = applog.createLogger({logger: baseLogger})
    // ## TEST
    let date = new Date('2017-01-08 12:00:00')
    logger.nextCheck(date)
    // ## Assert
    expect(baseLogger.info).to.be.calledWithExactly(
      ' 🕓  next check at Sun Jan 08 2017 12:00:00 GMT+0100 (CET)'
    )
    // ## End
  })
})
