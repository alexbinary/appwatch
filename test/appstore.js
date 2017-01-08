
let chai = require('chai')
let expect = chai.expect

let appstore = require('./../src/appstore')

describe('appstore', function () {
  it('getUrl()', function () {
    // ## Setup
    let appId = 'test.id'
    // ## TEST
    let url = appstore.getUrl(appId)
    // ## Assert
    expect(url).to.equal('https://itunes.apple.com/us/app/idtest.id')
    // ## End
  })
  it('getAppIsUp()', function () {
    // ## Setup
    let httpResponseNotUp = {
      headers: {
        'x-apple-request-store-front': 'foo'
      }
    }
    let httpResponseUp = {
      headers: {}
    }
    // ## TEST
    let resultUp = appstore.getAppIsUp(httpResponseUp)
    let resultNotUp = appstore.getAppIsUp(httpResponseNotUp)
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
        cb({headers: {}})
        return {
          on () { return this },
          end () {}
        }
      }
    }
    // ## TEST
    appstore.check(appId, cb, {http})
    // ## Assert
    expect(http.requestArgs[0][0]).to.equal(appstore.getUrl(appId))
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
    appstore.check(appId, cb, {http})
    // ## Assert
    expect(cbArgs[0][0]).to.be.instanceOf(Error)
    // ## End
  })
})
