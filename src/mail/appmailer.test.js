
let chai = require('chai')
let sinon = require('sinon')
let expect = chai.expect
chai.use(require('sinon-chai'))

let baseMailer = {
  send: sinon.spy()
}

let appmailer = require('./appmailer')

describe('appmailer', function () {
  it('sends notification email', function () {
    // ## Setup
    let mailer = appmailer.createMailer({
      mailer: baseMailer,
      config: {
        to: ['to1', 'to2'],
        from: 'from'
      }
    })
    // ## TEST
    let appName = 'app.name'
    let appId = 'app.id'
    let url = 'url'
    let isApple = false
    let cb = () => {}
    mailer.sendMail(appName, appId, url, isApple, cb)
    // ## Assert
    expect(baseMailer.send).to.be.calledWithExactly(
      {
        to: 'to1, to2',
        from: 'from',
        subject: '🎉  app.name is up on the PlayStore !',
        text: '🎉  app.name is up on the PlayStore ! url',
        attachment: [
          {
            alternative: true,
            data: '<html><p>🎉  <b>app.name</b> is up on the PlayStore !</p><p><a href="url">url</a></p></html>'
          }
        ]
      },
      cb
    )
    // ## End
  })
})
