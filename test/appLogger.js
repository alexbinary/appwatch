
let chai = require('chai')
let sinon = require('sinon')
let expect = chai.expect
chai.use(require('sinon-chai'))

let appLogger = require('./../src/appLogger')

function createBaseLogger () {
  let baseLogger = {
    info: sinon.spy(),
    error: sinon.spy()
  }
  return baseLogger
}

function createAppLogger (baseLogger) {
  let appLoggerInstance = appLogger.createLogger({
    name: 'test',
    logger: baseLogger
  })
  return appLoggerInstance
}

describe('appLogger', function () {
  it('produces log output for a check operation', function () {
    // ## Setup
    let baseLogger = createBaseLogger()
    let appLoggerInstance = createAppLogger(baseLogger)
    // ## TEST
    let appId = 1
    let appName = 'TEST'
    let isApple = true
    appLoggerInstance.check(appId, appName, isApple)
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
    let baseLogger = createBaseLogger()
    let appLoggerInstance = createAppLogger(baseLogger)
    // ## TEST
    let appId = 1
    let appName = 'TEST'
    let isApple = true
    let up = true
    appLoggerInstance.isUp(appId, appName, isApple, up)
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
    let baseLogger = createBaseLogger()
    let appLoggerInstance = createAppLogger(baseLogger)
    // ## TEST
    let err = new Error('test error')
    appLoggerInstance.mailError(err)
    // ## Assert
    expect(baseLogger.error).to.be.calledWithExactly(
      err
    )
    // ## End
  })
  it('produces log output for the next check', function () {
    // ## Setup
    let baseLogger = createBaseLogger()
    let appLoggerInstance = createAppLogger(baseLogger)
    // ## TEST
    let date = new Date('2017-01-08 12:00:00')
    appLoggerInstance.nextCheck(date)
    // ## Assert
    expect(baseLogger.info).to.be.calledWithExactly(
      ' 🕓  next check at Sun Jan 08 2017 12:00:00 GMT+0100 (CET)'
    )
    // ## End
  })
})
