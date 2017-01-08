
let chai = require('chai')
let expect = chai.expect

let appLogger = require('./../src/appLogger')

describe('appLogger', function () {
  it('check', function () {
    // ## Setup
    let mockLogger = createMockLogger()
    let logger = appLogger.create({
      name: 'test',
      logger: mockLogger
    })
    let appId = 1
    let appName = 'TEST'
    let isApple = true
    // ## TEST
    logger.check(appId, appName, isApple)
    // ## Assert
    expect(mockLogger.infoArgs).to.deep.equal([
      [
        {
          'appId': 1,
          'appName': 'TEST',
          'isApple': true
        },
        ' 🔮  Checking if TEST (1) is up on the AppStore...'
      ]
    ])
    // ## End
  })
  it('isUp', function () {
    // ## Setup
    let mockLogger = createMockLogger()
    let logger = appLogger.create({
      name: 'test',
      logger: mockLogger
    })
    let appId = 1
    let appName = 'TEST'
    let isApple = true
    let up = true
    // ## TEST
    logger.isUp(appId, appName, isApple, up)
    // ## Assert
    expect(mockLogger.infoArgs).to.deep.equal([
      [
        {
          'appId': 1,
          'appName': 'TEST',
          'isApple': true,
          'isUp': true
        },
        ' 🎉  TEST (1) is up on the AppStore!'
      ]
    ])
    // ## End
  })
  it('mailError', function () {
    // ## Setup
    let mockLogger = createMockLogger()
    let logger = appLogger.create({
      name: 'test',
      logger: mockLogger
    })
    let err = new Error('test error')
    // ## TEST
    logger.mailError(err)
    // ## Assert
    expect(mockLogger.errorArgs).to.deep.equal([
      [
        {}
      ]
    ])
    // ## End
  })
  it('nextCheck', function () {
    // ## Setup
    let mockLogger = createMockLogger()
    let logger = appLogger.create({
      name: 'test',
      logger: mockLogger
    })
    let date = new Date('2017-01-08 12:00:00')
    // ## TEST
    logger.nextCheck(date)
    // ## Assert
    expect(mockLogger.infoArgs).to.deep.equal([
      [
        ' 🕓  next check at Sun Jan 08 2017 12:00:00 GMT+0100 (CET)'
      ]
    ])
    // ## End
  })
})

function createMockLogger () {
  return {
    infoArgs: [],
    errorArgs: [],
    info () {
      this.infoArgs.push([...arguments])
    },
    error () {
      this.errorArgs.push([...arguments])
    }
  }
}
