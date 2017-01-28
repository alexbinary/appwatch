
let chai = require('chai')
let sinon = require('sinon')
let expect = chai.expect
chai.use(require('sinon-chai'))

let playstore = require('./playstore')

describe('playstore', function () {
  it('generates PlayStore public URL from packageName', function () {
    // ## Setup
    let appId = 'app.id'
    // ## TEST
    let url = playstore.getUrl(appId)
    // ## Assert
    expect(url).to.equal('https://play.google.com/store/apps/details?id=app.id')
    // ## End
  })
  it('detects if an app is up on the PlayStore', function () {
    // ## Setup
    let appId = 'app.id'
    let cb = sinon.spy()
    let http = {
      request: sinon.stub().callsArgWith(1, {
        statusCode: 200
      }).returns({
        on: function () { return this },
        end: function () { return this }
      })
    }
    // ## TEST
    playstore.check(appId, cb, {http})
    // ## Assert
    expect(cb).to.be.calledWithExactly(null, true)
    // ## End
  })
  it('detects if an app is not up on the PlayStore', function () {
    // ## Setup
    let appId = 'app.id'
    let cb = sinon.spy()
    let http = {
      request: sinon.stub().callsArgWith(1, {
        statusCode: 404
      }).returns({
        on: function () { return this },
        end: function () { return this }
      })
    }
    // ## TEST
    playstore.check(appId, cb, {http})
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
    playstore.check(appId, cb, {http})
    // ## Assert
    expect(cb).to.be.calledWithExactly('err')
    // ## End
  })
})
