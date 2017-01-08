
let chai = require('chai')
let expect = chai.expect

let playstore = require('./../src/playstore')

describe('playstore', function () {
  it('getUrl()', function () {
    // ## Setup
    let appId = 'test.id'
    // ## TEST
    let url = playstore.getUrl(appId)
    // ## Assert
    expect(url).to.equal('https://play.google.com/store/apps/details?id=test.id')
    // ## End
  })
  it('getAppIsUp()', function () {
    // ## Setup
    let httpResponseNotUp = {
      statusCode: 404
    }
    let httpResponseUp = {
      statusCode: 200
    }
    // ## TEST
    let resultUp = playstore.getAppIsUp(httpResponseUp)
    let resultNotUp = playstore.getAppIsUp(httpResponseNotUp)
    // ## Assert
    expect(resultUp).to.equal(true)
    expect(resultNotUp).to.equal(false)
    // ## End
  })
  it('check()', function () {
    // ## Setup
    let appId = 'test.id'
    let cbArgs = []
    let cb = function () {
      cbArgs.push([...arguments])
    }
    let http = {
      requestArgs: [],
      request (url, cb) {
        this.requestArgs.push([...arguments])
        cb({statusCode: 200})
        return {
          on () { return this },
          end () {}
        }
      }
    }
    // ## TEST
    playstore.check(appId, cb, {http})
    // ## Assert
    expect(http.requestArgs[0][0]).to.equal(playstore.getUrl(appId))
    expect(cbArgs).to.deep.equal([[null, true]])
    // ## End
  })
  it('check() error', function () {
    // ## Setup
    let appId = 'test.id'
    let cbArgs = []
    let cb = function () {
      cbArgs.push([...arguments])
    }
    let http = {
      requestArgs: [],
      request () {
        return {
          on (name, cb) {
            if (name === 'error') {
              cb(new Error())
            }
            return this
          },
          end () {}
        }
      }
    }
    // ## TEST
    playstore.check(appId, cb, {http})
    // ## Assert
    expect(cbArgs[0][0]).to.be.instanceOf(Error)
    // ## End
  })
})
