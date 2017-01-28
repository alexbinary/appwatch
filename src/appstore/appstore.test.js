
let chai = require('chai')
let sinon = require('sinon')
let expect = chai.expect
chai.use(require('sinon-chai'))

let appstore = require('./appstore')

describe('appstore', function () {
  it('generates AppStore public URL from app ID', function () {
    // ## Setup
    let appId = 'app.id'
    // ## TEST
    let url = appstore.getUrl(appId)
    // ## Assert
    expect(url).to.equal('https://itunes.apple.com/us/app/idapp.id')
    // ## End
  })
  it('detects if an app is up on the AppStore', function () {
    // ## Setup
    let appId = 'app.id'
    let cb = sinon.spy()
    let http = {
      request: sinon.stub().callsArgWith(1, {
        headers: {}
      }).returns({
        on: function () { return this },
        end: function () { return this }
      })
    }
    // ## TEST
    appstore.check(appId, cb, {http})
    // ## Assert
    expect(cb).to.be.calledWithExactly(null, true)
    // ## End
  })
  it('detects if an app is not up on the AppStore', function () {
    // ## Setup
    let appId = 'app.id'
    let cb = sinon.spy()
    let http = {
      request: sinon.stub().callsArgWith(1, {
        headers: {
          'x-apple-request-store-front': 'foo'
        }
      }).returns({
        on: function () { return this },
        end: function () { return this }
      })
    }
    // ## TEST
    appstore.check(appId, cb, {http})
    // ## Assert
    expect(cb).to.be.calledWithExactly(null, false)
    // ## End
  })
  it('handles low-level error', function () {
    // ## Setup
    let appId = 'app.id'
    let cb = sinon.spy()
    let http = {
      request: sinon.stub().returns({
        on: sinon.stub()
          .returnsThis()
          .callsArgWith(1, 'err'),
        end: function () { return this }
      })
    }
    // ## TEST
    appstore.check(appId, cb, {http})
    // ## Assert
    expect(cb).to.be.calledWithExactly('err')
    // ## End
  })
})
