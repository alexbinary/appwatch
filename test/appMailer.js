
let chai = require('chai')
let expect = chai.expect

let appMailer = require('./../src/appMailer')

describe('appMailer', function () {
  it('works', function () {
    // ## Setup
    let mailer = {
      sendArgs: [],
      send () {
        this.sendArgs.push([...arguments])
      }
    }
    let config = {
      to: ['to1', 'to2'],
      from: 'from'
    }
    let appName = 'app.name'
    let appId = 'app.id'
    let url = 'url'
    let isApple = false
    let cb = () => {}
    // ## TEST
    let mailerInstance = appMailer.create({
      mailer,
      config
    })
    mailerInstance.sendMail(appName, appId, url, isApple, cb)
    // ## Assert
    expect(mailer.sendArgs).to.deep.equal([
      [
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
      ]
    ])
    // ## End
  })
})
